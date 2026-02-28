import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features-bar.component.html',
  styleUrl: './features-bar.component.css'
})
export class FeaturesBarComponent {
  // Features bar static USPs (Match Figma explicitly)
  features = [
    { icon: 'pi pi-truck', title: 'Free Delivery', subtitle: 'For orders above 120 EGP' },
    { icon: 'pi pi-sync', title: 'Get Refund', subtitle: 'Refunds within 30 days' },
    { icon: 'pi pi-shield', title: 'Safe Payment', subtitle: '100% Secure Payment' },
    { icon: 'pi pi-headphones', title: '24/7 Support', subtitle: 'Contact us at any time' }
  ];
}
