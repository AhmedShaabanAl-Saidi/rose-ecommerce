import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStorageService } from '../services/auth-storage.service';
import { eAuthStateService as AuthStateService } from '@elevate/auth-domain';

export const guestGuard: CanActivateFn = (route, state) => {
  const storage = inject(AuthStorageService);
  const router = inject(Router);
  const authState = inject(AuthStateService);

  if (!storage.hasToken()) {
    return true;
  }

  const user = authState.currentUser();
  if (user?.role === 'admin') {
    router.navigate(['/dashboard'], { replaceUrl: true });
  } else {
    router.navigate(['/home'], { replaceUrl: true });
  }

  return false;
};
