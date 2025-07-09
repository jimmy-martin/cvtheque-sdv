import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (
      this.authService.isAuthenticated() &&
      this.authService.hasRole('ADMIN')
    ) {
      return true;
    }

    // Rediriger vers l'accueil si l'utilisateur n'est pas admin
    this.router.navigate(['/']);
    return false;
  }
}
