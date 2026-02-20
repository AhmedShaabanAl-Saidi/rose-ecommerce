import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  imports: [
    RouterModule,
    NgxSpinnerComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'E-commerce';
}
