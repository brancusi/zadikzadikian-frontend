import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Database<'postgres'> => {
  const connectionString = env('DATABASE_URL');
  const isProduction = env('NODE_ENV', 'development') === 'production';

  if (isProduction && !connectionString) {
    throw new Error('DATABASE_URL is required when NODE_ENV=production.');
  }

  const ssl = env.bool('DATABASE_SSL', false);

  return {
    connection: {
      client: 'postgres',
      connection: {
        ...(connectionString ? { connectionString } : {}),
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'zadikian_cms'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', ''),
        schema: env('DATABASE_SCHEMA', 'public'),
        ssl: ssl
          ? {
              rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
            }
          : false,
      },
      pool: {
        // Container platforms may terminate idle connections; do not hold a floor open.
        min: env.int('DATABASE_POOL_MIN', 0),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
      debug: env.bool('DATABASE_DEBUG', false),
    },
  };
};

export default config;
