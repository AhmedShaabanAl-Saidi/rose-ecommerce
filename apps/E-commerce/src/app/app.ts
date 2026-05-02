import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule } from 'lucide-angular';
import { ConfirmDialogComponent } from './shared/components/ui/dialogs/confirm-dialog/confirm-dialog.component';
import { SeoService } from './core/services/seo.service';
import { environment } from '../environments/environments';

@Component({
  imports: [
    RouterModule,
    NgxSpinnerComponent,
    PaginatorModule,
    ButtonModule,
    LucideAngularModule,
    ConfirmDialogComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);
  protected title = 'E-commerce';

  ngOnInit(): void {
    this.seoService.init();

    if (isPlatformBrowser(this.platformId) && environment.googleMapsKey) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}&libraries=maps&loading=async`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }
}
