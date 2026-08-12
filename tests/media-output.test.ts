import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const dist = join(process.cwd(), 'dist');
const html = (path: string) => readFileSync(join(dist, path, 'index.html'), 'utf8');

describe('static image and video presentation output', () => {
  it('renders responsive, intrinsically sized static images with one deliberate home LCP image', () => {
    const home = html('');

    expect(home).toContain('<picture class="artwork-image__picture"');
    expect(home).toMatch(/srcset="[^"]+ 320w,[^"]+ 1440w"/);
    expect(home).toContain('sizes="(max-width: 56rem) 100vw, 54vw"');
    expect(home).toMatch(/width="1440" height="1080"/);
    expect(home).toContain('media="(max-width: 42rem)"');
    expect((home.match(/loading="eager"/g) ?? []).length).toBe(1);
    expect((home.match(/fetchpriority="high"/g) ?? []).length).toBe(1);
    expect((home.match(/loading="lazy"/g) ?? []).length).toBeGreaterThanOrEqual(3);
  });

  it('uses contextual alt for informative images and empty alt for linked decorative studies', () => {
    const home = html('');
    const hero = home.match(/<img [^>]+loading="eager"[^>]*>/)?.[0] ?? '';
    const lazyImages = home.match(/<img [^>]+loading="lazy"[^>]*>/g) ?? [];

    expect(hero).toContain('alt="Abstract design study:');
    expect(lazyImages.length).toBeGreaterThan(0);
    lazyImages.forEach((image) => expect(image).toMatch(/\salt(?:="")?(?:\s|>)/));
  });

  it('keeps gallery browsing in ordinary links and works without scripts', () => {
    const series = html('work/path-to-nine');

    expect(series).toContain('aria-label="Design-study gallery navigation"');
    expect(series).toContain('href="#path-to-nine-study-threshold"');
    expect(series).toContain('id="path-to-nine-study-threshold"');
    expect(series).toContain('Back to gallery index');
    expect(series).not.toMatch(/<script(?:\s|>)/);
  });

  it('renders an inert provider-neutral video boundary with local accessibility resources', () => {
    const stacks = html('work/stacks');

    expect(stacks).toContain('data-video-id="vid-fixture-process-study-v1"');
    expect(stacks).toContain('data-video-provider="none"');
    expect(stacks).toContain('process-study-captions--3b314c097dc0.vtt');
    expect(stacks).toContain('process-study-transcript--3dc85f84b5cb.txt');
    expect(stacks).toContain('Read the fixture transcript');
    expect(stacks).not.toMatch(/<(?:video|iframe|mux-player)(?:\s|>)/);
    expect(stacks).not.toContain('stream.mux.com');
    expect(stacks).not.toContain('playback-id');
  });
});
