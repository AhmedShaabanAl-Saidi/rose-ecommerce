import { Component } from '@angular/core';
import { TrustedByComponent } from './components/trusted/trusted-by.component';

@Component({
  selector: 'app-home',
  imports: [TrustedByComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
