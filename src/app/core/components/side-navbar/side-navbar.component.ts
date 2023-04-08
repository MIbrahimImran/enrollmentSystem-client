import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent {
  currentUserRole: string;
  constructor(private router: Router, private authService: AuthService) {
    this.currentUserRole = this.authService.currentUserValue.role;
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToCourses() {
    this.router.navigate(['/course']);
  }

  navigateToStudents() {
    this.router.navigate(['/student']);
  }

  navigateToEnrollment() {
    this.router.navigate(['/enrollment']);
  }

  navigateToSchedule() {
    this.router.navigate(['/schedule']);
  }
}
