import { redirect } from 'next/navigation';
import PostList from '@/components/admin/PostList';
import { isAdmin } from '@/lib/adminAuth';
import { adminListPosts } from '@/lib/postsStore';
import { dbConfigured } from '@/lib/supabase';

// /admin/articles/: the blog articles with the home page's featured spots (this list was /admin/ itself until the dashboard got its overview)
export default async function ArticlesPage() {
  if (!(await isAdmin())) redirect('/admin/');
  let posts = [];
  let problem = '';
  if (!dbConfigured()) {
    problem = 'Supabase is not connected to the site yet (SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel).';
  } else {
    try {
      posts = await adminListPosts();
    } catch (err) {
      problem = /42P01|PGRST205|does not exist/.test(err.message)
        ? 'The articles table does not exist yet. In Supabase, open the SQL Editor and run scripts/supabase-posts.sql, then reload this page.'
        : `Supabase said: ${err.message}`;
    }
  }
  return <PostList posts={posts} problem={problem} />;
}
