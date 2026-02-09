import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
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
import { errorInterceptor } from './core/interceptors/errors/error-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  AlertCircle,
  ChevronDown,
  Eye,
  EyeOff,
  LucideAngularModule,
} from 'lucide-angular';
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
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
      LucideAngularModule.pick({ AlertCircle, Eye, EyeOff, ChevronDown })
    ),
  ],
};
