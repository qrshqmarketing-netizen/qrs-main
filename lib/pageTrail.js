// The last page a visitor was on before /start/, so a request knows where it came from and the stepper can pre-answer questions.
// Next.js changes pages without reloading, so document.referrer can't say; components/widgets/PageTrail.jsx notes each page here.
import { START_PATH } from '@/data/start';
import { session } from './storage';

const KEY = 'qrs-last-page';

export function rememberPage(path) {
  if (path && !path.startsWith(START_PATH) && !path.startsWith('/thank-you')) session.set(KEY, path);
}
export const lastPage = () => session.get(KEY) || '';
