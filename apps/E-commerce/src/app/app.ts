import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  imports: [
    RouterModule,
    NgxSpinnerComponent,
    PaginatorModule,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected title = 'E-commerce';
}
