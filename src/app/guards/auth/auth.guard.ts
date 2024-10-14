
import { inject } from '@angular/core';
import {  Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';


export function CanActivateAuthGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.getToken() != null) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}

