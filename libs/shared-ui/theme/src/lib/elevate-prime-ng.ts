import { providePrimeNG } from 'primeng/config';
import { elevatePrimePreset } from './elevate-prime-preset';

export function provideElevatePrimeNG() {
  return providePrimeNG({
    ripple: true,
    theme: {
      preset: elevatePrimePreset,
      options: {
        darkModeSelector: '.dark',
      },
    },
  });
}
