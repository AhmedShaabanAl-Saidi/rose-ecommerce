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
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { authInterceptor, provideAuth } from '@elevate/auth-data-access';
import { provideElevatePrimeNG } from '@elevate/theme';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  Bell,
  BrushCleaning,
  Check,
  ChevronDown,
  ChevronLeft,
  Clock3,
  Compass,
  CreditCard,
  Eye,
  EyeOff,
  Heart,
  HeartMinus,
  HeartPlus,
  House,
  Lock,
  LucideAngularModule,
  Mail,
  MapPin,
  MapPinPen,
  Minus,
  MoveLeft,
  MoveRight,
  Package,
  Phone,
  Plus,
  PlusCircle,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  TicketPercent,
  Trash2,
  UserRound,
  X,
  Zap,
} from 'lucide-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
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
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true,
      newestOnTop: true,
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
        X,
        Bell,
        MapPin,
        MapPinPen,
        Package,
        BrushCleaning,
        MoveLeft,
        Trash2,
        Minus,
        Plus,
        ArrowLeft,
        Compass,
        Zap,
        House,
        ShoppingBag,
        MoveRight,
        TicketPercent,
        ArrowRight,
        AlertTriangle,
        Banknote,
        CreditCard,
        ChevronLeft,
        PlusCircle,
        Phone,
        Check,
        Clock3,
        Mail,
      })
    ),
    provideElevatePrimeNG(),
    DialogService,
    ConfirmationService,
  ],
};
