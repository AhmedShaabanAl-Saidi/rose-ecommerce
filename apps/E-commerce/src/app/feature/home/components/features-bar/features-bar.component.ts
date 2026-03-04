import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-features-bar',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './features-bar.component.html',
  styleUrl: './features-bar.component.css',
})
export class FeaturesBarComponent {
  features = [
    {
      icon: 'pi pi-truck',
      title: 'HOME.FEATURES.FREE_DELIVERY.TITLE',
      subtitle: 'HOME.FEATURES.FREE_DELIVERY.SUBTITLE',
    },
    {
      icon: 'pi pi-sync',
      title: 'HOME.FEATURES.GET_REFUND.TITLE',
      subtitle: 'HOME.FEATURES.GET_REFUND.SUBTITLE',
    },
    {
      icon: 'pi pi-shield',
      title: 'HOME.FEATURES.SAFE_PAYMENT.TITLE',
      subtitle: 'HOME.FEATURES.SAFE_PAYMENT.SUBTITLE',
    },
    {
      icon: 'pi pi-headphones',
      title: 'HOME.FEATURES.SUPPORT.TITLE',
      subtitle: 'HOME.FEATURES.SUPPORT.SUBTITLE',
    },
  ];
}
