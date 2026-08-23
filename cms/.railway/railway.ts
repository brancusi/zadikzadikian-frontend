import { defineRailway, postgres, preserve, project, service, volume } from 'railway/iac';

export default defineRailway(() => {
  const database = postgres('Postgres', { region: 'ams' });
  const postgresVolume = volume('postgres-volume', {
    alerts: { usage: { '80': {}, '95': {}, '100': {} } },
    allowOnlineResize: true,
    region: 'ams',
    sizeMB: 50000,
  });

  const strapi = service('strapi-cms', {
    build: {
      builder: 'DOCKERFILE',
      dockerfilePath: 'Dockerfile',
    },
    deploy: {
      healthcheckPath: '/_health',
      healthcheckTimeout: 300,
    },
    replicas: { ams: 1 },
    env: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PUBLIC_URL: preserve(),
      PROXY_KOA: 'true',
      PROXY_IP_HEADER: 'X-Forwarded-For',
      PROXY_MAX_IPS: '1',
      APP_KEYS: preserve(),
      API_TOKEN_SALT: preserve(),
      ADMIN_JWT_SECRET: preserve(),
      TRANSFER_TOKEN_SALT: preserve(),
      JWT_SECRET: preserve(),
      ENCRYPTION_KEY: preserve(),
      DATABASE_URL: database.env.DATABASE_URL,
      DATABASE_SSL: 'false',
      DATABASE_SSL_REJECT_UNAUTHORIZED: 'true',
      DATABASE_POOL_MIN: '0',
      DATABASE_POOL_MAX: '10',
      DATABASE_CONNECTION_TIMEOUT: '60000',
      DATABASE_DEBUG: 'false',
      CRON_ENABLED: 'false',
      TRANSFER_REMOTE_ENABLED: 'false',
      WEBHOOKS_POPULATE_RELATIONS: 'false',
      STRAPI_TELEMETRY_DISABLED: 'true',
      STRAPI_UPDATE_NOTIFICATIONS: 'false',
      FLAG_DOC_LINKS: 'true',
      UPLOAD_PROVIDER: 'local',
    },
  });

  return project('zadikian-cms-nonproduction', {
    resources: [database, strapi, postgresVolume],
  });
});
