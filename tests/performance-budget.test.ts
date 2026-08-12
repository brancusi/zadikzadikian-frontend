import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { describe, expect, it } from 'vitest';

const dist = join(process.cwd(), 'dist');
const astroAssets = join(dist, '_astro');

function bytes(path: string): number {
  return statSync(path).size;
}

describe('preview performance budgets', () => {
  it('keeps representative HTML and CSS below launch budgets', () => {
    const routes = [
      join(dist, 'index.html'),
      join(dist, 'work', 'index.html'),
      join(dist, 'work', 'stacks', 'index.html'),
    ];
    const cssFiles = readdirSync(astroAssets)
      .filter((name) => extname(name) === '.css')
      .map((name) => join(astroAssets, name));

    routes.forEach((route) => expect(bytes(route)).toBeLessThan(35 * 1024));
    expect(cssFiles.reduce((total, file) => total + bytes(file), 0)).toBeLessThan(50 * 1024);
  });

  it('ships no client JavaScript and keeps every fixture derivative tiny', () => {
    const files = readdirSync(astroAssets);
    const scripts = files.filter((name) => /\.(?:js|mjs)$/i.test(name));
    const media = files
      .filter((name) => /\.(?:avif|webp|png)$/i.test(name))
      .map((name) => join(astroAssets, name));

    expect(scripts).toEqual([]);
    expect(media.length).toBeGreaterThan(0);
    media.forEach((file) => expect(bytes(file)).toBeLessThan(50 * 1024));
  });

  it('keeps the home document free of preload-heavy media behavior', () => {
    const home = readFileSync(join(dist, 'index.html'), 'utf8');

    expect((home.match(/loading="eager"/g) ?? [])).toHaveLength(1);
    expect(home).not.toMatch(/<link[^>]+rel="preload"[^>]+as="image"/);
    expect((home.match(/loading="lazy"/g) ?? []).length).toBeGreaterThan(0);
  });
});
