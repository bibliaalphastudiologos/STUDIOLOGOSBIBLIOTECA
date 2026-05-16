import { cp, rm, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('.');
const publicHtml = resolve(root, 'public_html');
const dist = resolve(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(publicHtml, dist, { recursive: true });

console.log('Synced public_html/ to dist/.');
