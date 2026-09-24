import { ArrowLeft, ArrowRight } from './icons';
import './ArrowButton.css';

// Round prev/next button for the services carousel and reviews slider
export default function ArrowButton({ direction, ...props }) {
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight;
  return (
    <button className="svc-arrow" type="button" {...props}>
      <Icon strokeWidth={2} />
    </button>
  );
}
