import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.auth.getCurrentUser();

    if (!user) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    const allowedRoles: string[] = next.data['roles'];
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
