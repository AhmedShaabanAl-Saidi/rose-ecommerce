import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AuthRepo, AuthState } from '@elevate/auth-domain';
import {
  TextInputComponent,
  PhoneInputComponent,
} from '@elevate/reusable-input';
import { ButtonComponent } from '../button/button.component';

interface PhoneValue {
  e164Number: string;
  internationalNumber?: string;
  nationalNumber?: string;
  countryCode?: string;
}

@Component({
  selector: 'lib-my-account',

  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    ConfirmDialogModule,
    TextInputComponent,
    PhoneInputComponent,
    RouterLink,
    ButtonComponent,
  ],
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
  private readonly cdr = inject(ChangeDetectorRef);
  user = this.authState.currentUser;
  profileForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl = signal<string | ArrayBuffer | null>(null);
  isLoading = signal(false);
  isUploadingPhoto = signal(false);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const user = this.user();
    this.previewUrl.set(user?.photo || null);

    this.profileForm = this.fb.group({
      firstName: [
        user?.firstName || '',
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [
        user?.lastName || '',
        [Validators.required, Validators.minLength(2)],
      ],
      email: [user?.email || '', [Validators.required, Validators.email]],
      phone: [user?.phone || '', [Validators.required]],
      gender: [{ value: user?.gender || '', disabled: true }],
    });

    // Mark as pristine after form is fully initialized
    setTimeout(() => {
      this.profileForm.markAsPristine();
      this.profileForm.markAsUntouched();
      this.cdr.markForCheck();
    }, 100);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.toastr.error(this.translate.instant('PROFILE_PAGE.FILE_SIZE_LIMIT'));
        return;
      }
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl.set(reader.result);
      };
      reader.readAsDataURL(file);

      const oldPhoto = this.previewUrl();
      this.isUploadingPhoto.set(true);
      const formData = new FormData();
      formData.append('photo', file);
      this.authRepo
        .uploadPhoto(formData)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.isUploadingPhoto.set(false);
            this.toastr.success(
              this.translate.instant('PROFILE_PAGE.PHOTO_UPDATED') ||
                'Photo updated successfully'
            );
            this.selectedFile = null;
          },
          error: () => {
            this.isUploadingPhoto.set(false);
            this.previewUrl.set(oldPhoto);
            this.toastr.error(
              this.translate.instant('PROFILE_PAGE.PHOTO_UPDATE_FAILED')
            );
          },
        });
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    if (this.profileForm.pristine) {
      return;
    }

    this.isLoading.set(true);

    const phoneRaw = this.profileForm.value.phone;
    const phone =
      typeof phoneRaw === 'string'
        ? phoneRaw
        : (phoneRaw as PhoneValue).e164Number;

    const payload = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      phone,
    };

    this.authRepo
      .editProfile(payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.toastr.success(
            this.translate.instant('PROFILE_PAGE.UPDATE_SUCCESS')
          );
          this.profileForm.markAsPristine();
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  deleteAccount(): void {
    this.confirmationService.confirm({
      message: this.translate.instant('PROFILE_PAGE.DELETE_CONFIRM_MESSAGE'),
      header: this.translate.instant('PROFILE_PAGE.DELETE_CONFIRMATION'),
      icon: 'pi pi-info-circle',
      acceptLabel: this.translate.instant('PROFILE_PAGE.YES_DELETE'),
      rejectLabel: this.translate.instant('PROFILE_PAGE.NO_KEEP'),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.authRepo
          .deleteMe()
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.toastr.success(
                this.translate.instant('PROFILE_PAGE.ACCOUNT_DELETED')
              );
              this.authRepo.cleanData();
              this.router.navigate(['/auth/login']);
            },
          });
      },
    });
  }
}
