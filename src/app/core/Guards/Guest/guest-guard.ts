import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const guestGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);
  const _CookieService = inject(CookieService);

  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (_CookieService.check('token')) {
      return _Router.parseUrl('/home');
    }
    return true;
  }

  return true;
};
