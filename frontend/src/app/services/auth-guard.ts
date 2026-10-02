import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);


  // During SSR, allow Angular to render the route.
  // The browser will perform the real authentication check.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }


  if (authService.isLoggedIn()) {
    return true;
  }


  return router.createUrlTree(['/login']);
};