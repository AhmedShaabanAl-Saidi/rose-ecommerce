import { Component } from '@angular/core';
import { AboutUs } from './components/about-us/about-us';
import { FeaturesBarComponent } from './components/features-bar/features-bar.component';

@Component({
  selector: 'app-home',
  imports: [AboutUs, FeaturesBarComponent],
  templateUrl: './home.html',
})
export class Home {}
