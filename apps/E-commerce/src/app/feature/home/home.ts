import { Component } from '@angular/core';

import { FeaturesBarComponent } from './components/features-bar/features-bar.component';
@Component({
  selector: 'app-home',
  imports: [FeaturesBarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
