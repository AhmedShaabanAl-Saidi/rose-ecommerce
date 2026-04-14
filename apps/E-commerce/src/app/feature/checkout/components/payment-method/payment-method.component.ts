import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

export type PaymentMethod = 'cash' | 'card';

@Component({
  selector: 'app-payment-method-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslateModule],
  templateUrl: './payment-method.component.html',
})
export class PaymentMethodSectionComponent {
  methodSelected = output<PaymentMethod>();

  selectedMethod = signal<PaymentMethod>('card');

  selectMethod(method: PaymentMethod) {
    this.selectedMethod.set(method);
    this.methodSelected.emit(method);
  }
}
