import type { Core } from '@strapi/strapi';

const middleware: Core.MiddlewareFactory = () => async (ctx, next) => {
  ctx.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  await next();
};

export default middleware;
