// How a job goes, in three quiet cards. Every line comes from what the site already says (the FAQ and "The QRS standard").
const STEPS = [
  { n: '01', title: 'A free roof evaluation', text: 'We use drone footage to see the condition of your roof, explain what we find in plain English and give you a clear next step: repair, monitor, maintain or replace.' },
  { n: '02', title: 'A written scope and price', text: 'Before any work begins, you get a written scope and price. No pressure, no mystery pricing and no surprises.' },
  { n: '03', title: 'Careful, documented work', text: 'We document what we find with photos, and our installs are backed by a 10-year workmanship warranty.' },
];

export default function StudioProcess() {
  return (
    <section className="st-section st-process">
      <div className="container">
        <div className="st-split st-head">
          <p className="st-label">How it works</p>
          <h2>Three steps, no surprises</h2>
        </div>
        <ol className="st-process-steps">
          {STEPS.map((s) => (
            <li key={s.n}>
              <span className="st-pstep-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
