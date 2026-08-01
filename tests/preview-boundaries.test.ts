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

const routes = ['/', 'work', 'work/path-to-nine', 'work/stacks', 'work/solis', 'about', 'cv', 'contact', '404'];

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
    expect(sample).toContain('Sample series page');
    expect(sample).toContain('Images and credits · rights approval required');
    expect(sample).toContain('Original abstract study');
  });

  it('ships a closed robots policy and Netlify noindex header', () => {
    expect(readFileSync(join(dist, 'robots.txt'), 'utf8')).toBe('User-agent: *\nDisallow: /\n');

    const netlify = readFileSync(join(root, 'netlify.toml'), 'utf8');
    expect(netlify).toContain('publish = "dist"');
    expect(netlify).toContain('X-Robots-Tag = "noindex, nofollow, noarchive"');
    expect(netlify).toContain("form-action 'none'");
  });

  it('contains no downloaded production media fixtures', () => {
    const publicFiles = filesBelow(join(root, 'public'));
    expect(publicFiles.some((path) => /\.(?:jpe?g|png|webp|gif|mp4|mov)$/i.test(path))).toBe(false);
    expect(existsSync(join(root, 'public', 'favicon.svg'))).toBe(true);
  });
});
