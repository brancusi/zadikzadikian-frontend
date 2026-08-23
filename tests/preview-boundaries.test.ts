import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const dist = join(root, 'dist');

function filesBelow(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesBelow(path) : [path];
  });
}

function htmlFor(route: string): string {
  const path = route === '/'
    ? join(dist, 'index.html')
    : route === '404'
      ? join(dist, '404.html')
      : join(dist, route, 'index.html');
  return readFileSync(path, 'utf8');
}

const routes = ['/', 'work', 'work/path-to-nine', 'work/stacks', 'work/solis', 'about', 'artist-statement', 'cv', 'contact', '404'];

describe('generated preview boundaries', () => {
  it.each(routes)('renders %s as noindex semantic HTML', (route) => {
    const html = htmlFor(route);

    expect((html.match(/<h1(?:\s|>)/g) ?? []).length).toBe(1);
    expect(html).toContain('<main id="main-content" tabindex="-1">');
    expect(html).toMatch(/<meta name="robots" content="noindex, nofollow, noarchive">/);
    expect(html).toContain('Design preview');
    expect(html).toContain('Skip to main content');
    expect(html).not.toMatch(/<script(?:\s|>)/);
    expect(html).not.toMatch(/(?:src|href)="https?:\/\//);
  });

  it('keeps unresolved facts and private contact details out of generated pages', () => {
    const publicHtml = filesBelow(dist)
      .filter((path) => path.endsWith('.html'))
      .map((path) => readFileSync(path, 'utf8'))
      .join('\n');

    const heldValues = [
      '1946',
      '1948',
      '1318 E 7th',
      '760 South Central',
      'zadikzadikian@gmail.com',
      'zz@zadikzadikian.com',
      '(323) 404-0838',
      'Gallery Without Walls',
      'Fallen Soldiers',
      'video-staging',
      'images.squarespace-cdn.com',
      'stream.mux.com',
    ];

    heldValues.forEach((value) => expect(publicHtml).not.toContain(value));
    expect(publicHtml).not.toMatch(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
    expect(publicHtml).not.toMatch(/<form(?:\s|>)/);
  });

  it('labels fixture visuals and sample series pages explicitly', () => {
    const home = htmlFor('/');
    const sample = htmlFor('work/path-to-nine');

    expect(home.match(/Preview fixture—not an artwork\./g)?.length).toBeGreaterThanOrEqual(4);
    expect(sample).toContain('Sample series · facts held for verification');
    expect(sample).toContain('Owner master and public rights required');
    expect(sample).toContain('original abstract fixture');
  });

  it('ships closed robots, host-specific preview headers, and exact one-hop migrations', () => {
    expect(readFileSync(join(dist, 'robots.txt'), 'utf8')).toBe('User-agent: *\nDisallow: /\n');

    const netlify = readFileSync(join(root, 'netlify.toml'), 'utf8');
    expect(netlify).toContain('publish = "dist"');
    expect(netlify).toContain('X-Robots-Tag = "noindex, nofollow, noarchive"');
    expect(netlify).toContain("form-action 'none'");
    expect(netlify).toContain('from = "/bio"\n  to = "/about/"');
    expect(netlify).toContain('from = "/resume"\n  to = "/cv/"');
    expect(netlify).toContain('from = "/path-to-nine-work"\n  to = "/work/path-to-nine/"');
    expect(netlify).toContain('from = "/work/gold-stacks"\n  to = "/work/stacks/"');
    expect(netlify).toContain('from = "/solis"\n  to = "/work/solis/"');
    expect(netlify).not.toMatch(/to = "\/"\n\s+status = 301/);

    const caddy = readFileSync(join(root, 'Caddyfile'), 'utf8');
    expect(caddy).toContain('root * dist');
    expect(caddy).toContain('X-Robots-Tag "noindex, nofollow, noarchive"');
    expect(caddy).toContain("form-action 'none'");
    expect(caddy).toContain('rewrite @notFound /404.html');
    expect(caddy).not.toContain('{path}/index.html /index.html');
  });

  it('contains only tiny, checksummed project-created media studies', () => {
    const publicFiles = filesBelow(join(root, 'public'));
    const fixtureFiles = filesBelow(join(root, 'src', 'assets', 'media', 'fixtures'));
    const fixtureBytes = fixtureFiles.reduce((total, path) => total + statSync(path).size, 0);

    expect(fixtureFiles).toHaveLength(5);
    fixtureFiles.forEach((path) => expect(path).toMatch(/--[0-9a-f]{12}\.png$/));
    expect(fixtureBytes).toBeLessThan(64 * 1024);
    expect(publicFiles.some((path) => /\.(?:jpe?g|png|webp|gif|mp4|mov)$/i.test(path))).toBe(false);
    expect(filesBelow(join(root, 'src')).some((path) => /\.(?:mp4|mov|m3u8)$/i.test(path))).toBe(false);
    expect(readFileSync(join(root, 'CONTENT-LICENSE.md'), 'utf8')).toContain('CC0 1.0');
    expect(existsSync(join(root, 'public', 'favicon.svg'))).toBe(true);
  });
});
