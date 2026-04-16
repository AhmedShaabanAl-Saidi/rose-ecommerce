import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Banknote,
  CreditCard,
  ChevronLeft,
  Check,
} from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@elevate/reusable-ui';

export type PaymentMethod = 'cash' | 'card';

@Component({
  selector: 'app-payment-method-section',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    TranslateModule,
    ButtonComponent,
  ],
  providers: [
    {
      provide: LucideAngularModule,
      useValue: LucideAngularModule.pick({
        Banknote,
        CreditCard,
        ChevronLeft,
        Check,
      }),
    },
  ],
  templateUrl: './payment-method.component.html',
})
export class PaymentMethodSectionComponent {
  isLoading = input<boolean>(false);
  
  methodSelected = output<PaymentMethod>();
  back = output<void>();
  checkout = output<void>();

  selectedMethod = signal<PaymentMethod>('card');

  selectMethod(method: PaymentMethod) {
    this.selectedMethod.set(method);
    this.methodSelected.emit(method);
  }

  onBack() {
    this.back.emit();
  }

  onCheckout() {
    this.checkout.emit();
  }
}
