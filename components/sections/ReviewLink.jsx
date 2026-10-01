export default function ReviewLink({ location, platform, destination }) {
  return (
    <a
      className={platform === 'Google' ? 'btn btn-gold' : 'btn btn-line'}
      href={`/go/review/${destination}/`}
      target="_blank"
      rel="noopener noreferrer"
      title={`Opens ${platform} to write a review for our ${location} location`}
    >
      Leave a {platform} review
    </a>
  );
}
