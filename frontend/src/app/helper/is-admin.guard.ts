import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs/operators';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.loggedInInfo().pipe(
    tap((data: any) => {
      if (data.companies !== null) {
        router.navigate(['/home']);
      }
    }),
    map((data: any) => {
      return data.companies === null;
    })
  );
}