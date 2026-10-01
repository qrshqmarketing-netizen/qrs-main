// Lets plain Node load the site's data files outside Next.js: resolves the '@/…' import alias to the project root
// and adds the '.js' / '.jsx' extension Next.js lets imports leave off. Registered by scripts/alias.mjs.
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

export async function resolve(specifier, context, next) {
  let spec = specifier.startsWith('@/') ? pathToFileURL(ROOT + specifier.slice(2)).href : specifier;
  if ((spec.startsWith('file:') || spec.startsWith('.')) && !/\.\w+$/.test(spec)) {
    const url = new URL(spec, context.parentURL);
    for (const ext of ['.js', '.jsx', '/index.js']) {
      if (existsSync(new URL(url.href + ext))) {
        spec = url.href + ext;
        break;
      }
    }
  }
  return next(spec, context);
}
