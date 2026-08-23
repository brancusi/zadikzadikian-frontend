import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => {
  const mediaOrigin = env('MEDIA_CSP_ORIGIN');
  const mediaSources = ["'self'", 'data:', 'blob:', ...(mediaOrigin ? [mediaOrigin] : [])];

  return [
    'strapi::logger',
    'strapi::errors',
    'global::nonproduction',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': mediaSources,
            'media-src': mediaSources,
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};

export default config;
