import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
