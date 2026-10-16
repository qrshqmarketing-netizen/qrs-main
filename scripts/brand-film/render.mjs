// Renders scripts/brand-film/film.html frame by frame in headless Chrome and pipes the frames to ffmpeg.
//   node scripts/brand-film/render.mjs stills 1,5,12.5 <outdir>      a JPEG of each moment (for checking)
//   node scripts/brand-film/render.mjs film <out.mp4> [fps]          the whole film as a near-lossless master
// Needs Google Chrome and an ffmpeg binary (FFMPEG=/path/to/ffmpeg, e.g. from npm ffmpeg-static). The web files are made from the
// master with encode.sh (VP9 WebM, H.264 MP4 and a poster).
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const [mode, arg, arg2] = process.argv.slice(2);
const W = 1920, H = 1080;
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(join(tmpdir(), 'film-'));
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', '--hide-scrollbars', '--allow-file-access-from-files', '--force-color-profile=srgb', `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore' });
let targets;
for (let i = 0; i < 60; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
const errors = [];
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: pathToFileURL(join(here, 'film.html')).href + '?render' });
await sleep(1500);
await evaluate('window.ready');
const duration = await evaluate('window.DURATION');
const shot = async (t, format = 'png') => {
  await evaluate(`seek(${t})`);
  const { result } = await send('Page.captureScreenshot', { format, ...(format === 'jpeg' && { quality: 80 }) });
  return Buffer.from(result.data, 'base64');
};

if (mode === 'stills') {
  const out = resolve(arg2 || '.');
  mkdirSync(out, { recursive: true });
  for (const t of arg.split(',').map(Number)) writeFileSync(join(out, `t${String(t).padStart(5, '0')}.jpg`), await shot(t, 'jpeg'));
} else if (mode === 'film') {
  const fps = +(arg2 || 30);
  const ff = spawn(process.env.FFMPEG || 'ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '10', '-pix_fmt', 'yuv420p', resolve(arg)], { stdio: ['pipe', 'inherit', 'inherit'] });
  const frames = Math.round(duration * fps);
  const t0 = Date.now();
  for (let f = 0; f < frames; f++) {
    const buf = await shot(f / fps);
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (f % 150 === 0) console.log(`frame ${f}/${frames} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
}
if (errors.length) console.log('PAGE ERRORS:\n' + errors.join('\n'));
ws.close();
chrome.kill();
