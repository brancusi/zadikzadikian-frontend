import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  proxy: {
    koa: env.bool('PROXY_KOA', false),
    ipHeader: env('PROXY_IP_HEADER', 'X-Forwarded-For'),
    maxIpsCount: env.int('PROXY_MAX_IPS', 1),
  },
  app: {
    keys: env.array('APP_KEYS')!,
  },
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
  transfer: {
    remote: {
      enabled: env.bool('TRANSFER_REMOTE_ENABLED', false),
    },
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  logger: {
    updates: {
      enabled: env.bool('STRAPI_UPDATE_NOTIFICATIONS', false),
    },
  },
});

export default config;
