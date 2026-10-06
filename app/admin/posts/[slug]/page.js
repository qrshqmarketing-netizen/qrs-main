import { notFound, redirect } from 'next/navigation';
import PostEditor from '@/components/admin/PostEditor';
import { isAdmin } from '@/lib/adminAuth';
import { postToForm } from '@/lib/articleFormat';
import { adminGetPost } from '@/lib/postsStore';

export default async function EditPostPage({ params }) {
  if (!(await isAdmin())) redirect('/admin');
  const post = await adminGetPost((await params).slug);
  if (!post) notFound();
  return <PostEditor initial={postToForm(post)} />;
}
