import { registerRemotes } from '@module-federation/enhanced/runtime';

const isLocalDevelopment = ['localhost', '127.0.0.1'].includes(
  window.location.hostname
);

const dashboardEntry = isLocalDevelopment
  ? 'http://localhost:4201/mf-manifest.json'
  : new URL('/dashboard/mf-manifest.json', window.location.origin).href;

async function startApplication(): Promise<void> {
  try {
    await registerRemotes([{ name: 'dashboard', entry: dashboardEntry }]);
  } catch (error) {
    // The storefront should remain available if the optional dashboard remote fails.
    console.error('Failed to register the dashboard remote.', error);
  }

  await import('./bootstrap');
}

startApplication().catch((error) =>
  console.error('Failed to bootstrap the application.', error)
);
