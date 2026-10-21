import Mark from '@/components/ui/Mark';
import Rich from '@/components/ui/Rich';

// A home section's heading, after digitalocean.com: one centered heading (`__word__` gets the hand-drawn underline) and one short centered line,
// which may carry [links](/path/).
export default function HomeHead({ id, heading, text }) {
  return (
    <div className="hc-head">
      <h2 id={id}>
        <Mark text={heading} />
      </h2>
      {text && (
        <p>
          <Rich text={text} />
        </p>
      )}
    </div>
  );
}
