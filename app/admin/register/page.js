import { redirect } from 'next/navigation';
import RegisterForm from '@/components/admin/RegisterForm';
import { accountsReady, isAdmin, MIN_ACCOUNT_PASSWORD } from '@/lib/adminAuth';

// /admin/register/: ask for a dashboard account (waits for an admin's approval on /admin/team/)
export default async function RegisterPage() {
  if (await isAdmin()) redirect('/admin/');
  return <RegisterForm ready={accountsReady()} min={MIN_ACCOUNT_PASSWORD} />;
}
