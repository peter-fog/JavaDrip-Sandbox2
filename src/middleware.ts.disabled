import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RedirectClient, WithMemoryCache } from '@uniformdev/redirect';

const client = new RedirectClient({
  apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
  dataCache: new WithMemoryCache({ prePopulate: true, refreshRate: 20000 }),
});

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const result = await client.processUrlBestMatch(url.pathname, undefined, true);
  if (result) {
    return NextResponse.redirect(new URL(result.url, request.url), result.definition?.redirect.targetStatusCode ?? 301);
  }
  return;
}

export const config = {
  matcher: '/((?!api|_next|favicon.ico).*)',
};
