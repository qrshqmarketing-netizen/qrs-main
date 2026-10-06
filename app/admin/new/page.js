import { redirect } from 'next/navigation';
import PostEditor from '@/components/admin/PostEditor';
import { today } from '@/lib/adminActions';
import { isAdmin } from '@/lib/adminAuth';
import { postToForm } from '@/lib/articleFormat';

export default async function NewPostPage() {
  if (!(await isAdmin())) redirect('/admin');
  return <PostEditor isNew initial={{ ...postToForm({ status: 'draft' }), datePublished: today() }} />;
}
