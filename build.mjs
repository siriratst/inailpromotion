import { cpSync, mkdirSync, existsSync } from 'node:fs';
for (const source of ['index.html', 'style.css', 'app.js', 'assets']) {
  if (!existsSync(source)) throw new Error(`Missing website file: ${source}`);
}
mkdirSync('dist', { recursive: true });
for (const source of ['index.html', 'style.css', 'app.js', 'assets']) {
  cpSync(source, `dist/${source}`, { recursive: true });
}
console.log('Website ready in dist/');
