import { defineMiddleware } from 'astro:middleware';
import { getTokenFromCookies, validateToken } from './lib/auth';

export const onRequest = defineMiddleware(async ({ request, redirect, url }, next) => {
  // Only protect /admin/* routes (except /admin/login)
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    const token = getTokenFromCookies(request.headers.get('cookie'));

    if (!token) {
      return redirect('/admin/login');
    }

    const user = await validateToken(token);
    if (!user) {
      return redirect('/admin/login');
    }
  }

  return next();
});
