import { Component } from '@angular/core';
import { AboutUs } from './components/about-us/about-us';
import { FeaturesBarComponent } from './components/features-bar/features-bar.component';

@Component({
  selector: 'app-home',
  imports: [AboutUs],
@Component({
  selector: 'app-home',
  imports: [FeaturesBarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
