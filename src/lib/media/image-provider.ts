import { getImage } from 'astro:assets';
import fieldStudy from '../../assets/media/fixtures/field-study--58cdcd8b4b14.png';
import processPoster from '../../assets/media/fixtures/process-poster--3a494f5af5e1.png';
import stackStudy from '../../assets/media/fixtures/stack-study--b1b954c134cd.png';
import thresholdPortrait from '../../assets/media/fixtures/threshold-portrait--49e1670e34a8.png';
import thresholdWide from '../../assets/media/fixtures/threshold-wide--3207a4e1df4f.png';
import type { ImageMedia } from './model';

type StaticImageSource = typeof fieldStudy;

interface RegisteredImageSource {
  asset: StaticImageSource;
  path: string;
}

// The only image-source registry. Content records stay provider-neutral while this
// adapter owns Astro's static transforms and the immutable URLs Netlify serves.
const imageSources: Readonly<Record<string, RegisteredImageSource>> = {
  'img-fixture-field-v1': {
    asset: fieldStudy,
    path: 'src/assets/media/fixtures/field-study--58cdcd8b4b14.png',
  },
  'img-fixture-process-poster-v1': {
    asset: processPoster,
    path: 'src/assets/media/fixtures/process-poster--3a494f5af5e1.png',
  },
  'img-fixture-stack-v1': {
    asset: stackStudy,
    path: 'src/assets/media/fixtures/stack-study--b1b954c134cd.png',
  },
  'img-fixture-threshold-portrait-v1': {
    asset: thresholdPortrait,
    path: 'src/assets/media/fixtures/threshold-portrait--49e1670e34a8.png',
  },
  'img-fixture-threshold-wide-v1': {
    asset: thresholdWide,
    path: 'src/assets/media/fixtures/threshold-wide--3207a4e1df4f.png',
  },
};

const candidateWidths = [320, 480, 640, 900, 960, 1280, 1440, 1600] as const;

type OutputFormat = 'avif' | 'webp';

export interface ResponsiveImageSources {
  avifSrcset: string;
  webpSrcset: string;
  fallbackSrc: string;
}

function sourceFor(media: ImageMedia): StaticImageSource {
  const source = imageSources[media.id];
  if (!source) throw new Error(`No image provider source registered for ${media.id}`);
  if (source.path !== media.source.path) {
    throw new Error(`Provider source path does not match media record ${media.id}`);
  }
  if (source.asset.width !== media.width || source.asset.height !== media.height) {
    throw new Error(`Provider dimensions do not match media record ${media.id}`);
  }
  return source.asset;
}

function widthsFor(media: ImageMedia): number[] {
  const widths: number[] = candidateWidths.filter((width) => width <= media.width);
  if (!widths.includes(media.width)) widths.push(media.width);
  return [...new Set(widths)].sort((a, b) => a - b);
}

async function srcsetFor(media: ImageMedia, format: OutputFormat): Promise<string> {
  const source = sourceFor(media);
  const results = await Promise.all(widthsFor(media).map(async (width) => ({
    width,
    output: await getImage({
      src: source,
      width,
      format,
      quality: format === 'avif' ? 58 : 78,
    }),
  })));

  return results.map(({ width, output }) => `${output.src} ${width}w`).join(', ');
}

export async function buildResponsiveImageSources(media: ImageMedia): Promise<ResponsiveImageSources> {
  const source = sourceFor(media);
  const fallbackWidth = Math.min(media.width, 1280);
  const [avifSrcset, webpSrcset, fallback] = await Promise.all([
    srcsetFor(media, 'avif'),
    srcsetFor(media, 'webp'),
    getImage({ src: source, width: fallbackWidth, format: 'webp', quality: 78 }),
  ]);

  return {
    avifSrcset,
    webpSrcset,
    fallbackSrc: fallback.src,
  };
}
