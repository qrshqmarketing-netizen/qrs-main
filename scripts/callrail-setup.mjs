// Makes sure CallRail posts every finished call to the site (/api/callrail/), keeping any webhook addresses already set up in CallRail.
//   npm run callrail:setup              (needs the CallRail API key in the environment)
//   npm run callrail:setup -- --deploy  (what every production deploy runs after the build, from `postbuild` in package.json: only on Vercel
//                                       production with the key there, and a failure only prints a warning, so it never breaks a deploy)
import { callrailConfigured, ensureCallrailWebhook } from '../lib/callrail.js';

if (process.argv.includes('--deploy')) {
  const skip = (why) => { console.log(`[callrail] setup skipped: ${why}`); process.exit(0); };
  if (process.env.VERCEL_ENV !== 'production') skip('not a production deploy');
  if (!callrailConfigured()) skip('no CallRail API key');
  const warn = (e) => { console.warn(`[callrail] setup failed, the deploy carries on: ${e?.message || e}`); process.exit(0); };
  process.on('uncaughtException', warn);
  process.on('unhandledRejection', warn);
}

console.log(`[callrail] ${await ensureCallrailWebhook()}`);
