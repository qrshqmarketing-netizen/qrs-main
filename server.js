// QRS one-page site — local Node.js server (no dependencies).
// Run with:  npm start   (or: node server.js)
// Then open: http://localhost:3000

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const HOME = 'QRS-roofing-services-carousel.html';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
};

// Only serve files that sit directly in this folder (never qrs-website/ or dotfiles)
function resolveFile(urlPath) {
  const name = decodeURIComponent(urlPath.split('?')[0]).replace(/^\/+/, '');
  if (name === '' || name === 'index.html') return path.join(ROOT, HOME);
  if (name.includes('/') || name.startsWith('.') || name === 'server.js' || name === 'package.json') return null;
  if (!TYPES[path.extname(name).toLowerCase()]) return null;
  return path.join(ROOT, name);
}

const server = http.createServer((req, res) => {
  let file;
  try { file = resolveFile(req.url); } catch { file = null; }

  if (!file) return notFound(res, req.url);

  fs.readFile(file, (err, data) => {
    if (err) return notFound(res, req.url);
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store', // always show your latest edits on refresh
    });
    res.end(data);
  });
});

function notFound(res, url) {
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html><meta charset="utf-8"><title>Not found</title>
    <body style="font-family:system-ui;padding:40px;color:#062d57">
    <h1>Page not built yet</h1><p><code>${url.replace(/[<>&"]/g, '')}</code> doesn't exist on this local preview.</p>
    <p><a href="/">← Back to the home page</a></p></body>`);
}

server.listen(PORT, () => {
  console.log(`\n  QRS site running at  http://localhost:${PORT}\n  Press Ctrl+C to stop.\n`);
});
