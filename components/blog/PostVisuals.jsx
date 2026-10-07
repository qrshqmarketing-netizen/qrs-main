import ChecklistTracker from './ChecklistTracker';
import CommercialHotspots from './CommercialHotspots';
import DecisionCards from './DecisionCards';
import FactGrid from './FactGrid';
import FlagCards from './FlagCards';
import LayerDiagram from './LayerDiagram';
import ProblemPicker from './ProblemPicker';
import ProCards from './ProCards';
import ProposalDoc from './ProposalDoc';
import RoofTypeTabs from './RoofTypeTabs';
import RowCards from './RowCards';
import Timeline from './Timeline';
import VersusMatrix from './VersusMatrix';

// Turns a section's blocks into the visual that data/blog/visuals.js asks for, leaving every other block as it was.
// blocks: the section's blocks; spec: { steps | groups | table | list | checklist: 'name' }; plain: renders one ordinary block (BlogPost.jsx's
// Block); ctx: { slug, id } (names the checklist's saved ticks). A spec that finds nothing to restyle (the article changed) leaves the section as
// plain text, and a table with the wrong number of columns for its visual stays a table.

// "Stay safe. Stay off the roof..." -> { title: 'Stay safe', body: ['Stay off the roof...'] }
const splitStep = (step) => {
  const i = step.search(/\.\s/);
  return i > 0 && i < 90 ? { title: step.slice(0, i), body: [step.slice(i + 2)] } : { title: step, body: [] };
};

// h3 + the paragraphs under it, collected from index `from` until a block that isn't a paragraph or an h3
const collectGroups = (blocks, from) => {
  const groups = [];
  let i = from;
  for (; i < blocks.length; i++) {
    const b = blocks[i];
    if (b && b.h3) groups.push({ title: b.h3, body: [] });
    else if (typeof b === 'string' && groups.length) groups.at(-1).body.push(b);
    else break;
  }
  return { groups, end: i };
};

// "1. Water stains" / "Step 2: Tile removal" -> { n: 1, title: 'Water stains' }
const numbered = (g) => {
  const m = /^(?:Step\s+)?(\d+)[.:]\s*(.*)$/i.exec(g.title);
  return m ? { n: Number(m[1]), title: m[2], body: g.body } : g;
};

const LABELS = {
  layers: 'Cross-section of a tile roof: tiles, underlayment, roof deck and rafters, with a vent pipe, its flashing and a valley. Numbered pins mark where each cause of a leak can start.',
  hotspots: 'A flat commercial roof: a parapet wall, a drain, a seam, a rooftop unit on its curb, a vent pipe, a skylight, a blistered patch of membrane and an open edge. Numbered pins mark where leaks tend to start.',
};

export default function renderSection(blocks, spec, plain, ctx = {}) {
  const out = [];
  const used = {};
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];

    if (spec.steps && b?.steps && !used.steps) {
      used.steps = true;
      out.push(<Timeline key={i} items={b.steps.map(splitStep)} />);
      continue;
    }

    if (spec.checklist && b?.checklist && !used.checklist) {
      used.checklist = true;
      out.push(<ChecklistTracker key={i} items={b.checklist} storageKey={`qrs-check:${ctx.slug}:${ctx.id}`} />);
      continue;
    }

    if (spec.groups && b?.h3 && !used.groups) {
      used.groups = true;
      const { groups, end } = collectGroups(blocks, i);
      if (spec.groups === 'timeline') out.push(<Timeline key={i} heading items={groups.map(numbered)} />);
      else if (spec.groups === 'cards') out.push(<ProCards key={i} tone="info" items={groups.map(numbered)} />);
      else out.push(<ProCards key={i} tone={spec.groups === 'cons' ? 'con' : 'pro'} items={groups} />);
      i = end - 1;
      continue;
    }

    if (spec.list && b?.list && !used.list) {
      used.list = true;
      if (spec.list === 'layers') out.push(<LayerDiagram key={i} items={b.list} label={LABELS.layers} />);
      else if (spec.list === 'flags') out.push(<FlagCards key={i} items={b.list} />);
      else out.push(<FactGrid key={i} items={b.list} numbered={spec.list === 'facts-numbered'} />);
      continue;
    }

    if (spec.table && b?.table && !used.table) {
      used.table = true;
      const { head, rows } = b.table;
      const cols = head.length;
      const t = spec.table;
      if (t === 'tabs' && cols >= 2) out.push(<RoofTypeTabs key={i} head={head} rows={rows} />);
      else if (t === 'versus' && cols === 3) out.push(<VersusMatrix key={i} head={head} rows={rows} />);
      else if (t === 'decide' && (cols === 2 || cols === 3)) out.push(<DecisionCards key={i} head={head} rows={rows} />);
      else if (t === 'picker' && cols === 3) out.push(<ProblemPicker key={i} head={head} rows={rows} />);
      else if (t === 'document' && cols === 2) out.push(<ProposalDoc key={i} head={head} rows={rows} />);
      else if (t === 'cards' && cols >= 2) out.push(<RowCards key={i} head={head} rows={rows} />);
      else if (t === 'hotspots' && cols === 2) out.push(<CommercialHotspots key={i} items={rows.map((r) => ({ title: r[0], text: r[1] }))} label={LABELS.hotspots} />);
      else out.push(plain(b, i));
      continue;
    }

    out.push(plain(b, i));
  }
  return out;
}
