import { NextPageContext } from 'next';
import {
  Context,
  ManifestV2,
  ContextPlugin,
  enableDebugConsoleLogDrain,
  enableContextDevTools,
} from '@uniformdev/context';
import { NextCookieTransitionDataStore } from '@uniformdev/context-next';
import { enableGoogleGtagAnalytics } from '@uniformdev/context-gtag';

import manifest from './manifest.json';

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function createUniformContext(serverContext?: NextPageContext): Context {
  const plugins: ContextPlugin[] = [enableContextDevTools(), enableDebugConsoleLogDrain('debug')];
  // Docs: https://docs.uniform.app/integrations/data/google-analytics#activate-ga-plugin
  if (googleAnalyticsId) plugins.push(enableGoogleGtagAnalytics({ emitAll: true }));
  const context = new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new NextCookieTransitionDataStore({
      serverContext,
    }),
    plugins: plugins,
  });
  return context;
}
