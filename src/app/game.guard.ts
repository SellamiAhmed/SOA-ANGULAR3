import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GameGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAdmin()) {
      console.log('Admin');
      return true;
    } else {
      console.log('Forbidden');
      this.router.navigate(['app-forbidden']);
      return false;
    }
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isloggedIn) {
      console.log('Authorized');
      return true;
    } else {
      console.log('Unauthorized');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
