import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule } from 'lucide-angular';
import { ConfirmDialogComponent } from './shared/components/ui/dialogs/confirm-dialog/confirm-dialog.component';
import { SeoService } from './core/services/seo.service';

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
  protected title = 'E-commerce';

  ngOnInit(): void {
    this.seoService.init();
  }
}
