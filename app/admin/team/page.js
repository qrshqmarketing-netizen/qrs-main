import { redirect } from 'next/navigation';

// /admin/team/ became the Users page (/admin/users/) on October 20 2026; old links and bookmarks land there
export default function TeamPage() {
  redirect('/admin/users/');
}
