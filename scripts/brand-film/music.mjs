// An original, royalty-free soundtrack for the brand film, synthesized from scratch (no samples, no outside music): 128 BPM in A minor
// (Am, F, C, G), timed to film.html's cuts. Intro with ticking hats and a filtered arp, the groove from "Every kind of roof." (6.5 s), whooshes
// into each scene change, a build with a snare roll, the drop as the night sky rises (36.5 s, the dark act), a breakdown under
// "A roof you can trust." and a final hit on the logo (57.1 s) that rings out.
//   node scripts/brand-film/music.mjs out.wav
import { writeFileSync } from 'node:fs';

const SR = 48000, DUR = 62, N = SR * DUR;
const BEAT = 60 / 128, BAR = BEAT * 4, GRID0 = 36.5 - 19 * BAR; // the drop (36.5 s) falls on the first beat of bar 19
const bt = (b) => GRID0 + b * BEAT;
const drums = [new Float32Array(N), new Float32Array(N)];
const music = [new Float32Array(N), new Float32Array(N)]; // ducked by the kick (sidechain)
const revSend = new Float32Array(N), dlySend = new Float32Array(N);
const side = new Float32Array(N).fill(1);
let seed = 7;
const noise = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2147483648 - 1; };
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const idx = (t) => Math.round(t * SR);
function put(bus, i, v, pan = 0) { if (i < 0 || i >= N) return; const a = (pan + 1) * Math.PI / 4; bus[0][i] += v * Math.cos(a); bus[1][i] += v * Math.sin(a); }
function blep(t, dt) { if (t < dt) { t /= dt; return t + t - t * t - 1; } if (t > 1 - dt) { t = (t - 1) / dt; return t * t + t + t + 1; } return 0; }
function svf() { let low = 0, band = 0; return (x, fc, q = .7) => { const f = 2 * Math.sin(Math.PI * Math.min(fc, SR / 6) / SR); low += f * band; const high = x - low - q * band; band += f * high; return low; }; }

// ---------- instruments ----------
function kick(t, amp = 1) {
  const i0 = idx(t); let ph = 0;
  for (let n = 0; n < SR * .5; n++) {
    const s = n / SR, f = 44 + 120 * Math.exp(-s / .028);
    ph += 2 * Math.PI * f / SR;
    const v = (Math.sin(ph) * Math.exp(-s / .3) + noise() * .25 * Math.exp(-s / .0015)) * amp;
    put(drums, i0 + n, Math.tanh(v * 1.6) * .9);
    const d = 1 - .82 * Math.exp(-s / .11);
    if (i0 + n < N && d < side[i0 + n]) side[i0 + n] = d;
  }
}
function clap(t, amp = 1, rev = .3) {
  const i0 = idx(t), f = svf();
  for (let n = 0; n < SR * .35; n++) {
    const s = n / SR;
    const env = (s < .03 ? (Math.exp(-(s % .0105) / .003)) : 0) + Math.exp(-s / .13) * (s >= .021 ? 1 : 0);
    const x = noise(); const bp = x - f(x, 1100);
    const v = (bp * .9 + Math.sin(2 * Math.PI * 190 * s) * .25 * Math.exp(-s / .05)) * env * amp;
    put(drums, i0 + n, v, .05); if (i0 + n < N) revSend[i0 + n] += v * rev;
  }
}
function hat(t, amp = 1, open = false, pan = .2) {
  const i0 = idx(t); let prev = 0; const len = open ? .28 : .05;
  for (let n = 0; n < SR * len; n++) {
    const s = n / SR, x = noise(), hp = x - prev; prev = x;
    put(drums, i0 + n, hp * Math.exp(-s / (open ? .09 : .016)) * amp * .5, pan);
  }
}
function saw2(freqs, t, dur, amp, cutoff, opts = {}) {
  const i0 = idx(t), len = Math.floor((dur + (opts.rel ?? .08)) * SR), f = svf(), f2 = svf();
  const phs = freqs.map(() => (noise() + 1) / 2);
  for (let n = 0; n < len; n++) {
    const s = n / SR; let x = 0;
    freqs.forEach((fr, k) => { const dt = fr / SR; phs[k] = (phs[k] + dt) % 1; x += 2 * phs[k] - 1 - blep(phs[k], dt); });
    x /= freqs.length;
    const att = Math.min(1, s / (opts.att ?? .004)), rel = s > dur ? Math.exp(-(s - dur) / ((opts.rel ?? .08) / 4)) : 1;
    const env = att * rel * (opts.decay ? Math.exp(-s / opts.decay) : 1);
    const fc = cutoff(s);
    let y = f(x, fc, opts.q ?? .6); if (opts.steep) y = f2(y, fc, .9);
    const v = y * env * amp;
    const bus = opts.bus || music;
    put(bus, i0 + n, v, opts.pan ?? 0);
    if (opts.sub) put(bus, i0 + n, Math.sin(2 * Math.PI * freqs[0] * s) * env * amp * opts.sub);
    if (i0 + n < N) { revSend[i0 + n] += v * (opts.rev ?? 0); dlySend[i0 + n] += v * (opts.dly ?? 0); }
  }
}
const det = (m, cents = 9) => [mtof(m) * Math.pow(2, -cents / 1200), mtof(m) * Math.pow(2, cents / 1200)];
function bass(t, m, dur, amp = .5, open = 0) { saw2(det(m, 6), t, dur, amp, (s) => 220 + (900 + open * 2200) * Math.exp(-s / .09), { sub: .9, rel: .03, steep: true }); }
function pluck(t, m, amp = .2, bright = 1, pan = 0) { saw2(det(m, 8), t, .12, amp, (s) => 500 + 4200 * bright * Math.exp(-s / .1), { decay: .2, rev: .25, dly: .35, pan, rel: .2 }); }
function pad(t, ms, dur, amp = .12, cut = 1200) { ms.forEach((m, k) => saw2([...det(m, 12), mtof(m)], t, dur, amp, (s) => cut + 350 * Math.sin(s * 1.3 + k), { att: .7, rel: 1.1, rev: .45, pan: (k - 1) * .5 })); }
function stab(t, ms, amp = .22) { ms.forEach((m, k) => saw2(det(m + 12, 14), t, .14, amp, (s) => 900 + 5200 * Math.exp(-s / .07), { decay: .16, rev: .35, pan: (k - 1) * .6, rel: .1 })); }
function riser(t0, t1, amp = .35) {
  const i0 = idx(t0), len = idx(t1) - i0, f = svf(); let ph = 0;
  for (let n = 0; n < len; n++) {
    const p = n / len, fc = 250 * Math.pow(36, p), x = noise();
    const bp = f(x, fc, .35);
    ph += 2 * Math.PI * (180 * Math.pow(6, p)) / SR;
    const v = (bp * .9 + Math.sin(ph) * .18) * p * p * amp;
    put(music, i0 + n, v, Math.sin(p * 12) * .4); revSend[i0 + n] += v * .3;
  }
}
function whoosh(tEnd, dur = .5, amp = .22) {
  const i0 = idx(tEnd - dur), len = idx(dur), f = svf();
  for (let n = 0; n < len; n++) { const p = n / len; const v = f(noise(), 400 + 7000 * p * p, .5) * Math.pow(p, 2.4) * amp; put(drums, i0 + n, v, (p - .5) * 1.2); revSend[i0 + n] += v * .4; }
}
function impact(t, amp = 1) {
  const i0 = idx(t); let ph = 0, prev = 0;
  for (let n = 0; n < SR * 2.4; n++) {
    const s = n / SR; ph += 2 * Math.PI * (36 + 40 * Math.exp(-s / .08)) / SR;
    const x = noise(), hp = x - prev; prev = x;
    const v = (Math.sin(ph) * Math.exp(-s / .7) * .9 + hp * Math.exp(-s / .5) * .35) * amp;
    put(drums, i0 + n, v); if (i0 + n < N) revSend[i0 + n] += hp * Math.exp(-s / .4) * .3 * amp;
  }
}

// ---------- arrangement ----------
const CHORDS = [[57, 60, 64], [53, 57, 60], [55, 60, 64], [55, 59, 62]]; // Am, F, C, G
const ROOTS = [33, 29, 36, 31];
const BASSLINE = [0, 0, 12, 0, 0, 12, 0, 7];
const ARP = [0, 1, 2, 3, 4, 5, 3, 2];
const arpNote = (ch, k) => { const a = ARP[k % 8]; return ch[a % 3] + 12 * (1 + Math.floor(a / 3)); };
const chordAt = (bar) => (((bar % 4) + 4) % 4);
const SCENE_CUTS = [11.0, 15.5, 22.5, 26.5, 31.5, 45.5, 49.5];

// Intro: bars 0-2 (plus the free half second before the grid)
pad(0, CHORDS[0].map((m) => m - 12), 6.4, .1, 700);
for (let s16 = 0; s16 < 12 * 4; s16++) { const t = bt(s16 / 4); hat(t, .25 + .5 * (s16 / 48), false, s16 % 2 ? .3 : -.3); }
for (let s16 = 16; s16 < 48; s16++) pluck(bt(s16 / 4), arpNote(CHORDS[chordAt(Math.floor(s16 / 16))], s16), .1 + .08 * (s16 / 48), .25 + .5 * (s16 / 48), s16 % 2 ? .35 : -.35);
kick(bt(7), .7); stab(bt(7), CHORDS[1], .14); // "with QRS"
riser(bt(8), bt(12), .3); whoosh(bt(12), .7, .3);
impact(bt(12), .55);

// Groove A: bars 3-17; build: bar 18; drop B: bars 19-27; breakdown: bars 28-29; finale: bar 30
function groove(bar, heavy) {
  const ch = CHORDS[chordAt(bar)], root = ROOTS[chordAt(bar)];
  const g = heavy ? 1 : .78; // the first groove sits lower, so the drop lands harder
  for (let b = 0; b < 4; b++) {
    const beat = bar * 4 + b;
    kick(bt(beat), g);
    if (b % 2 === 1) clap(bt(beat), .75 * g);
    hat(bt(beat + .5), .55 * g, true, .25);
    for (let q = 0; q < 4; q++) hat(bt(beat + q / 4), (q === 2 ? .35 : .22) * (heavy ? 1.2 : 1), false, q % 2 ? .35 : -.2);
  }
  BASSLINE.forEach((o, k) => bass(bt(bar * 4 + k / 2), root + o, BEAT / 2 * .8, .5 * g, heavy ? .6 : .2));
  for (let k = 0; k < 16; k++) pluck(bt(bar * 4 + k / 4), arpNote(ch, k), .13 * g, heavy ? 1 : .75, k % 2 ? .4 : -.4);
  pad(bt(bar * 4), ch, BAR - .1, heavy ? .07 : .06, heavy ? 1700 : 1200);
  if (heavy) [0, .75, 1.5, 2.5, 3.25].forEach((o) => stab(bt(bar * 4 + o), ch, .16));
}
for (let bar = 3; bar <= 17; bar++) groove(bar, false);
SCENE_CUTS.filter((t) => t < 34).forEach((t) => whoosh(t, .45, .2));
// Build (bar 18): kick on the first two beats, snare roll speeding up, a riser, a beat of air before the drop
kick(bt(72)); kick(bt(73));
for (let k = 0; k < 14; k++) { const step = k < 8 ? .25 : .125; clap(bt(72 + (k < 8 ? k * .25 : 2 + (k - 8) * .125)), .25 + .5 * (k / 14), .2); void step; }
for (let k = 0; k < 8; k++) bass(bt(72 + k / 2), ROOTS[chordAt(18)] + BASSLINE[k], BEAT / 2 * .8, .4, k / 8);
riser(bt(70), bt(75.75), .42); whoosh(bt(76), .9, .35);
// The drop: the night sky (36.5 s)
impact(bt(76), 1);
for (let bar = 19; bar <= 27; bar++) groove(bar, true);
SCENE_CUTS.filter((t) => t > 40).forEach((t) => whoosh(t, .45, .24));
// Breakdown (bars 28-29): no kick, the arp and pad carry "A roof you can trust."
for (let bar = 28; bar <= 29; bar++) {
  const ch = CHORDS[chordAt(bar)];
  pad(bt(bar * 4), ch, BAR - .1, .09, 1000);
  for (let k = 0; k < 16; k++) pluck(bt(bar * 4 + k / 4), arpNote(ch, k), .1, .5, k % 2 ? .45 : -.45);
  for (let k = 0; k < 8; k++) hat(bt(bar * 4 + k / 2), .2, false, .3);
}
riser(bt(116), bt(119.8), .4); whoosh(bt(120), .8, .35);
// Finale (bar 30): the logo
impact(bt(120), 1.05); kick(bt(120), 1);
stab(bt(120), CHORDS[0], .26);
pad(bt(120), [45, 57, 60, 64, 71], 3.4, .1, 1500);
kick(59.4, .35); hat(59.4, .3, true); // the address line

// ---------- effects and master ----------
// Ping-pong delay on the arp (a dotted eighth), then a small Schroeder reverb on the send
const D = Math.round(BEAT * .75 * SR);
for (let i = 0; i < N; i++) {
  const l = i >= D ? dlySend[i - D] : 0, r = i >= 2 * D ? dlySend[i - 2 * D] : 0;
  music[0][i] += l * .55; music[1][i] += r * .45;
  if (i + D < N) dlySend[i + D] += dlySend[i] * .0; // single repeats keep the arp clear
  revSend[i] += (l + r) * .15;
}
function reverb(input, combs, aps) {
  const out = new Float32Array(N);
  for (const d of combs) { const buf = new Float32Array(d); let p = 0, lp = 0; for (let i = 0; i < N; i++) { const y = buf[p]; lp = y * .6 + lp * .4; buf[p] = input[i] + lp * .8; p = (p + 1) % d; out[i] += y * .25; } }
  for (const d of aps) { const buf = new Float32Array(d); let p = 0; for (let i = 0; i < N; i++) { const b = buf[p], y = -out[i] + b; buf[p] = out[i] + b * .5; p = (p + 1) % d; out[i] = y; } }
  return out;
}
const rl = reverb(revSend, [1700, 1777, 1631, 1557], [245, 607]);
const rr = reverb(revSend, [1723, 1801, 1655, 1583], [251, 613]);
const out = [new Float32Array(N), new Float32Array(N)];
let peak = 0;
for (let c = 0; c < 2; c++) for (let i = 0; i < N; i++) {
  const v = drums[c][i] + music[c][i] * side[i] + (c ? rr[i] : rl[i]) * .5;
  out[c][i] = v; peak = Math.max(peak, Math.abs(v));
}
const fadeIn = .25, fadeOut = 1.6;
for (let c = 0; c < 2; c++) for (let i = 0; i < N; i++) {
  const s = i / SR, g = Math.min(1, s / fadeIn) * Math.min(1, (DUR - s) / fadeOut);
  out[c][i] = Math.tanh((out[c][i] / peak) * 1.6) / Math.tanh(1.6) * .93 * g;
}
const wav = Buffer.alloc(44 + N * 4);
wav.write('RIFF', 0); wav.writeUInt32LE(36 + N * 4, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(SR, 24); wav.writeUInt32LE(SR * 4, 28); wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { wav.writeInt16LE(Math.round(out[0][i] * 32767), 44 + i * 4); wav.writeInt16LE(Math.round(out[1][i] * 32767), 46 + i * 4); }
writeFileSync(process.argv[2] || 'music.wav', wav);
console.log('wrote', process.argv[2] || 'music.wav', DUR + ' s');
