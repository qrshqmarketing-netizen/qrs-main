// rel=nofollow: /go/ is an outbound redirect that robots.txt keeps crawlers out of, so search engines shouldn't follow these links (Search Console
// listed the four /go/review/ addresses as "Blocked by robots.txt" on November 12 2026)
export default function ReviewLink({ location, platform, destination }) {
  return (
    <a
      className={platform === 'Google' ? 'btn btn-gold' : 'btn btn-line'}
      href={`/go/review/${destination}/`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      title={`Opens ${platform} to write a review for our ${location} location`}
    >
      Leave a {platform} review
    </a>
  );
}
