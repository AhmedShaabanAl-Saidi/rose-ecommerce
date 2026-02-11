import { Component, inject, output, signal, PLATFORM_ID, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthRepo } from '@elevate/auth-domain';
import { UiButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { OtpInputComponent } from '@elevate/reusable-input';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, Subject, takeWhile, takeUntil, startWith, map } from 'rxjs';

type LoadingState = 'idle' | 'verifying' | 'resending';

@Component({
  selector: 'app-otp-code',
  imports: [CommonModule, ReactiveFormsModule, UiButtonComponent, OtpInputComponent, TranslatePipe],
  templateUrl: './otp-code.component.html',
})
export class OtpCodeComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly auth = inject(AuthRepo);
  private readonly destroyRef = inject(DestroyRef);

  readonly email = signal<string>('');
  readonly timer = signal<number>(0);
  readonly loadingState = signal<LoadingState>('idle');

  readonly isVerifying = computed(() => this.loadingState() === 'verifying');
  readonly isResending = computed(() => this.loadingState() === 'resending');
  readonly isLoading = computed(() => this.loadingState() !== 'idle');
  readonly canResend = computed(() => this.timer() === 0 && !this.isLoading());
  readonly isFormValid = computed(() =>
    this.otpControl.valid && this.email().length > 0
  );

  readonly back = output<void>();

  readonly otpControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    nonNullable: true
  });

  private readonly timerReset$ = new Subject<void>();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeEmail();
      this.startTimer();
    }
  }

  private initializeEmail(): void {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      this.email.set(storedEmail);
    }
  }

  private startTimer(): void {
    const TIMER_DURATION = 60;
    this.timer.set(TIMER_DURATION);

    interval(1000)
      .pipe(
        startWith(0),
        map(tick => TIMER_DURATION - tick - 1),
        takeWhile(time => time >= 0),
        takeUntil(this.timerReset$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(time => {
        this.timer.set(time);
      });
  }

  verify(): void {
    if (!this.isFormValid() || this.isLoading()) {
      this.otpControl.markAsTouched();
      return;
    }

    this.loadingState.set('verifying');

    const payload = {
      email: this.email(),
      resetCode: this.otpControl.value
    };

    this.auth.verifyResetCode(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadingState.set('idle');
          this.clearStoredEmail();
        }
      });
  }

  resend(): void {
    if (!this.canResend()) {
      return;
    }

    this.loadingState.set('resending');

    this.auth.forgetPassword({ email: this.email() })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadingState.set('idle');
          this.resetTimer();
          this.otpControl.reset();
        }
      });
  }

  onEdit(): void {
    this.back.emit();
  }

  private resetTimer(): void {
    this.timerReset$.next();
    this.startTimer();
  }

  private clearStoredEmail(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('email');
    }
  }

  formatTimer(): string {
    const time = this.timer();
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}