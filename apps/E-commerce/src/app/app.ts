import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, FileIcon } from 'lucide-angular';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  imports: [
    RouterModule,
    LucideAngularModule,
    TranslateModule,
    NgxSpinnerComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly translate = inject(TranslateService);
  protected title = 'E-commerce';
  readonly FileIcon = FileIcon;

  constructor() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  changeClient(lang: string) {
    this.translate.use(lang);
    if (lang === 'ar') {
      document.dir = 'rtl';
    } else {
      document.dir = 'ltr';
    }
  }
}
