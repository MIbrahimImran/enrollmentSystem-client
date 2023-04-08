import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  userName = 'John Doe';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.userName = currentUser.studentName;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
