import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const maroon = {
  50: 'var(--color-maroon-50)',
  100: 'var(--color-maroon-100)',
  200: 'var(--color-maroon-200)',
  300: 'var(--color-maroon-300)',
  400: 'var(--color-maroon-400)',
  500: 'var(--color-maroon-500)',
  600: 'var(--color-maroon-600)',
  700: 'var(--color-maroon-700)',
  800: 'var(--color-maroon-800)',
  900: 'var(--color-maroon-900)',
  950: 'var(--color-maroon-950)',
};

const softPink = {
  50: 'var(--color-soft-pink-50)',
  100: 'var(--color-soft-pink-100)',
  200: 'var(--color-soft-pink-200)',
  300: 'var(--color-soft-pink-300)',
  400: 'var(--color-soft-pink-400)',
  500: 'var(--color-soft-pink-500)',
  600: 'var(--color-soft-pink-600)',
  700: 'var(--color-soft-pink-700)',
  800: 'var(--color-soft-pink-800)',
  900: 'var(--color-soft-pink-900)',
  950: 'var(--color-soft-pink-950)',
};

const lightSurface = {
  0: 'var(--color-zinc-50)',
  50: 'var(--color-zinc-50)',
  100: 'var(--color-zinc-100)',
  200: 'var(--color-zinc-200)',
  300: 'var(--color-zinc-300)',
  400: 'var(--color-zinc-400)',
  500: 'var(--color-zinc-500)',
  600: 'var(--color-zinc-600)',
  700: 'var(--color-zinc-700)',
  800: 'var(--color-zinc-800)',
  900: 'var(--color-zinc-900)',
  950: 'var(--color-zinc-950)',
};

const darkSurface = {
  0: 'var(--color-zinc-950)',
  50: 'var(--color-zinc-950)',
  100: 'var(--color-zinc-900)',
  200: 'var(--color-zinc-800)',
  300: 'var(--color-zinc-700)',
  400: 'var(--color-zinc-600)',
  500: 'var(--color-zinc-500)',
  600: 'var(--color-zinc-400)',
  700: 'var(--color-zinc-300)',
  800: 'var(--color-zinc-200)',
  900: 'var(--color-zinc-100)',
  950: 'var(--color-zinc-50)',
};

export const elevatePrimePreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: maroon,
        surface: lightSurface,
      },
      dark: {
        primary: softPink,
        surface: darkSurface,
      },
    },
  },
});
