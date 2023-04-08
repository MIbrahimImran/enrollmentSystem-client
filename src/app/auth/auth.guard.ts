import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

interface RouteData {
  roles?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    const routeData: RouteData = route.data as RouteData;
    const requiredRoles = routeData.roles;

    if (currentUser) {
      if (
        requiredRoles &&
        requiredRoles.length > 0 &&
        !requiredRoles.includes(currentUser.role)
      ) {
        // Unauthorized
        this.router.navigate(['/login']);
        return false;
      }

      // Authorized
      return true;
    }

    // Not logged in
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
