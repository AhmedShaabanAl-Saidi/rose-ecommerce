import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { eAuthStateService as AuthStateService } from '@elevate/auth-domain';

export const userGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authState = inject(AuthStateService);

  const user = authState.currentUser();
  if (user?.role === 'admin') {
    router.navigate(['/unauthorized'], { replaceUrl: true });
    return false;
  }

  return true;
};
