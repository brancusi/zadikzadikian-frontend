import type { VideoMedia } from './model';

export interface InertVideoPresentation {
  mode: 'inert';
  notice: string;
}

export type VideoPresentation = InertVideoPresentation;

/**
 * Provider boundary for video presentation. Content records contain no vendor URL
 * or credential. A separately reviewed Mux adapter can resolve stable video IDs
 * here later; page and component contracts remain unchanged.
 */
export function resolveVideoPresentation(video: VideoMedia): VideoPresentation {
  if (video.presentation !== 'inert-design-study') {
    throw new Error(`No reviewed playback adapter is configured for ${video.id}`);
  }

  return {
    mode: 'inert',
    notice: 'Playback is intentionally inactive in this design preview.',
  };
}

export function publicMediaUrl(repositoryPath: string): string {
  if (!repositoryPath.startsWith('public/media/') || repositoryPath.includes('..')) {
    throw new Error(`Unsafe public media path: ${repositoryPath}`);
  }
  return repositoryPath.slice('public'.length);
}
