import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import { LucideAngularModule, FileIcon } from 'lucide-angular';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [RouterModule, LucideAngularModule, TranslateModule], 

=======
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [RouterModule, TranslateModule],
>>>>>>> aed7c5b5df89c9271f71b74e99ac6e16665abaa2
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly translate = inject(TranslateService);
  protected title = 'E-commerce';
<<<<<<< HEAD
  readonly FileIcon = FileIcon;
=======
>>>>>>> aed7c5b5df89c9271f71b74e99ac6e16665abaa2

  constructor() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  changeClient(lang: string) {
    this.translate.use(lang);
    if(lang === 'ar') {
      document.dir = 'rtl';
    } else {
      document.dir = 'ltr';
    }
  }
}
