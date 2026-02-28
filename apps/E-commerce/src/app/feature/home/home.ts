import { Component } from '@angular/core';
import { GallerySectionComponent } from './components/gallery-section/gallery-section.component';

@Component({
  selector: 'app-home',
  imports: [GallerySectionComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
