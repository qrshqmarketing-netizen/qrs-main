import Mark from '@/components/ui/Mark';
import Rich from '@/components/ui/Rich';

// A home section's heading, after digitalocean.com: one centered heading (`__word__` gets the hand-drawn underline) and one short centered line,
// which may carry [links](/path/).
// tag: 'h2' (default) or 'h1' (the home page's first section carries the page's H1)
export default function HomeHead({ id, heading, text, tag: Tag = 'h2' }) {
  return (
    <div className="hc-head">
      <Tag id={id}>
        <Mark text={heading} />
      </Tag>
      {text && (
        <p>
          <Rich text={text} />
        </p>
      )}
    </div>
  );
}
