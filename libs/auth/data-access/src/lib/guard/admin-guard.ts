import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStorageService } from '../services/auth-storage.service';
import { eAuthStateService as AuthStateService } from '@elevate/auth-domain';

export const adminGuard: CanActivateFn = (route, state) => {
  const storage = inject(AuthStorageService);
  const router = inject(Router);
  const authState = inject(AuthStateService);

  if (storage.hasToken()) {
    const user = authState.currentUser();
    if (user && user.role === 'admin') {
      return true;
    }
    router.navigate(['/unauthorized'], { replaceUrl: true });
    return false;
  }

  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
