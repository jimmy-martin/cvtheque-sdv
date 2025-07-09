import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  currentRoute: string = '';

  constructor(private authService: AuthService, private router: Router) {
    // Écouter les changements de route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getUserEmail(): string | null {
    return this.authService.getUserEmail();
  }

  hasAdminRole(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isActiveRoute(route: string): boolean {
    if (route === '/') {
      return this.currentRoute === '/' || this.currentRoute === '/home';
    }
    return this.currentRoute.startsWith(route);
  }
}
