import Rich from '@/components/ui/Rich';
import './IndexNote.css';

// A short text block at the bottom of an index page (blog, reviews): a heading and a few paragraphs of copy, so the page says
// more than its cards do. note: { heading, paragraphs } from the page's data file. Text accepts [links](/path/) and **bold**.
export default function IndexNote({ note }) {
  if (!note) return null;
  return (
    <section className="index-note section">
      <div className="container">
        <div className="index-note-body">
          <h2>{note.heading}</h2>
          {note.paragraphs.map((text) => (
            <p key={text}><Rich text={text} /></p>
          ))}
        </div>
      </div>
    </section>
  );
}
