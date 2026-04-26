import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepo, AuthState } from '@elevate/auth-domain';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { forkJoin, Observable, take } from 'rxjs';
import { TextInputComponent, PhoneInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { PhoneValue } from '../../../auth/pages/register/interface/PhoneValue.interface';

@Component({
  selector: 'app-my-account',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TranslateModule, ConfirmDialogModule, TextInputComponent, PhoneInputComponent, ButtonComponent],
  providers: [ConfirmationService],
  templateUrl: './my-account.component.html',
})
export class MyAccountComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authRepo = inject(AuthRepo);
  private readonly authState = inject(AuthState);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly router = inject(Router);

  profileForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl = signal<string | ArrayBuffer | null>(null);
  isLoading = signal(false);

  get user() {
    return this.authState.currentUser();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const user = this.user;
    this.previewUrl.set(user?.photo || null);

    this.profileForm = this.fb.group({
      firstName: [user?.firstName || '', [Validators.required, Validators.minLength(2)]],
      lastName: [user?.lastName || '', [Validators.required, Validators.minLength(2)]],
      email: [user?.email || '', [Validators.required, Validators.email]],
      phone: [user?.phone || '', [Validators.required]],
      gender: [{ value: user?.gender || '', disabled: true }],
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.toastr.error('File size exceeds 5MB limit');
        return;
      }
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl.set(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const phoneRaw = this.profileForm.value.phone;
    const phone = typeof phoneRaw === 'string'
      ? phoneRaw
      : (phoneRaw as PhoneValue).e164Number;

    const payload = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      phone,
    };

    let requests$: Observable<any> = this.authRepo.editProfile(payload);

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('photo', this.selectedFile);
      requests$ = forkJoin([
        this.authRepo.uploadPhoto(formData),
        this.authRepo.editProfile(payload)
      ]);
    }

    requests$
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.toastr.success(this.translate.instant('PROFILE_UPDATED_SUCCESSFULLY') || 'Profile updated successfully');
          this.selectedFile = null;
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  deleteAccount(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete your account? This action is permanent and cannot be undone.',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Yes, delete',
      rejectLabel: 'Nope, not doing it',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.authRepo.deleteMe()
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.toastr.success('Account deleted successfully');
              this.authRepo.cleanData();
              this.router.navigate(['/auth/login']);
            }
          });
      }
    });
  }
}
