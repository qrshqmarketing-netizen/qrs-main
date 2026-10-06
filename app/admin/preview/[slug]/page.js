import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import BlogPost from '@/components/templates/BlogPost';
import { isAdmin } from '@/lib/adminAuth';
import { adminGetPost } from '@/lib/postsStore';

// A draft (or any article) as visitors will see it, straight from the database, for the team only
export default async function PreviewPage({ params }) {
  if (!(await isAdmin())) redirect('/admin');
  const post = await adminGetPost((await params).slug);
  if (!post) notFound();
  return (
    <>
      <div className="adm-preview-bar">
        Preview{post.status === 'published' ? '' : ' of a draft: not visible to visitors'}. <Link href={`/admin/posts/${post.slug}`}>Back to the editor</Link>
      </div>
      <BlogPost post={post} />
    </>
  );
}
