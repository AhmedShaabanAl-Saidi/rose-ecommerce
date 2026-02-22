import { authInterceptor, provideAuth } from '@elevate/auth-data-access';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  AlertCircle,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  LucideAngularModule,
} from 'lucide-angular';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { provideThemeInitializer } from './core/initializers/theme.initializer';
import { provideLanguageInitializer } from './core/initializers/language.initializer';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import MyPreset from '../mypreset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideThemeInitializer(),
    provideLanguageInitializer(),
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
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
      LucideAngularModule.pick({ AlertCircle, Eye, EyeOff, ChevronDown, Lock })
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
