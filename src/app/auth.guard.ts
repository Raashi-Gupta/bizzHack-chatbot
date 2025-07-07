import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userEmail = localStorage.getItem('userName');

  if (userEmail) {
    return true; // Allow access
  } else {
    const router = inject(Router);
    return router.parseUrl('/login'); // Redirect to login
  }
};
