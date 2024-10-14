
import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';


export function CanActivateRegisterGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.getToken() != null) {
    router.navigate(['/transacoes']);
    return false;
  } else {
    return true;
  }
}

