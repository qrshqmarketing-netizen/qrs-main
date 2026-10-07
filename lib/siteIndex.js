// The list of every page (lib/pageIndex.js) with the blog articles as they are in the database right now (lib/postsStore.js), for the AI files
// (llms.txt, llms-full.txt, the OKF bundle) and the chat assistant's search. Server-side only.
import { cache } from 'react';
import { buildPageIndex } from '@/lib/pageIndex';
import { getHomeFaqs } from '@/lib/contentStore';
import { getPublishedPosts } from '@/lib/postsStore';

export const getPageIndex = cache(async () => buildPageIndex(await getPublishedPosts(), await getHomeFaqs()));
