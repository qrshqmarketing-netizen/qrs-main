import Image from 'next/image';
import Link from 'next/link';

// The frame of the login and register screens: the QRS mark and name, a two-tab switch (Log in / Create account) and a white card on the soft
// background, in the dashboard's AdFlux style.
export default function AuthCard({ title, text, tab, canRegister, children }) {
  return (
    <div className="adm-auth">
      <div className="adm-auth-card">
        <div className="adm-auth-brand">
          <Image src="/images/logo/qrs-mark.webp" alt="" width={40} height={40} unoptimized />
          <span>
            <b>Quality Roofing Specialists</b>
            <small>Team dashboard</small>
          </span>
        </div>
        {canRegister && (
          <nav className="adm-tabs" aria-label="Log in or create an account">
            <Link href="/admin/" className={tab === 'login' ? 'on' : ''} aria-current={tab === 'login' ? 'page' : undefined}>
              Log in
            </Link>
            <Link href="/admin/register/" className={tab === 'register' ? 'on' : ''} aria-current={tab === 'register' ? 'page' : undefined}>
              Create account
            </Link>
          </nav>
        )}
        <h1>{title}</h1>
        <p className="adm-auth-text">{text}</p>
        {children}
      </div>
    </div>
  );
}
