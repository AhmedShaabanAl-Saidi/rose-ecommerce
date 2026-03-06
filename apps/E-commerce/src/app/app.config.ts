import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { authInterceptor, provideAuth } from '@elevate/auth-data-access';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  AlertCircle,
  Bell,
  ChevronDown,
  Eye,
  EyeOff,
  Heart,
  HeartMinus,
  HeartPlus,
  Lock,
  LucideAngularModule,
  MapPin,
  Package,
  Search,
  ShoppingCart,
  Star,
  UserRound,
} from 'lucide-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { providePrimeNG } from 'primeng/config';
import MyPreset from '../mypreset';
import { appRoutes } from './app.routes';
import { provideLanguageInitializer } from './core/initializers/language.initializer';
import { provideThemeInitializer } from './core/initializers/theme.initializer';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideThemeInitializer(),
    provideLanguageInitializer(),
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingInterceptor, authInterceptor, errorInterceptor])
    ),
    provideAuth({ baseUrl: 'https://flower.elevateegy.com/' }),
    provideZonelessChangeDetection(),
    provideTranslateService({
      fallbackLang: 'en',
    }),
    provideTranslateHttpLoader({
      prefix: '/i18n/',
      suffix: '.json',
    }),
    provideToastr({
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    importProvidersFrom([
      NgxSpinnerModule.forRoot({ type: 'triangle-skew-spin' }),
    ]),
    importProvidersFrom(
      LucideAngularModule.pick({
        AlertCircle,
        Eye,
        EyeOff,
        ChevronDown,
        Lock,
        ShoppingCart,
        Star,
        Heart,
        HeartPlus,
        HeartMinus,
        Search,
        UserRound,
        Bell,
        MapPin,
        Package,
      })
    ),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
  ],
};
