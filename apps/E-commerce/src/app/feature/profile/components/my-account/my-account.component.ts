import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepo, AuthState } from '@elevate/auth-domain';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-my-account',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TranslateModule, ConfirmDialogModule],
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
      phone: [user?.phone || '', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
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

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('firstName', this.profileForm.value.firstName);
      formData.append('lastName', this.profileForm.value.lastName);
      formData.append('email', this.profileForm.value.email);
      formData.append('phone', this.profileForm.value.phone);
      formData.append('photo', this.selectedFile);

      this.authRepo.editProfile(formData)
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
    } else {
      const payload = {
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        email: this.profileForm.value.email,
        phone: this.profileForm.value.phone,
      };

      this.authRepo.editProfile(payload)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.isLoading.set(false);
            this.toastr.success(this.translate.instant('PROFILE_UPDATED_SUCCESSFULLY') || 'Profile updated successfully');
          },
          error: () => {
            this.isLoading.set(false);
          },
        });
    }
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
