import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      studentID: 'U13607305',
      password: '6res8p0p',
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { studentID, password } = this.loginForm.value;
      this.authService.login(studentID, password).subscribe((user) => {
        if (user) {
          this.openSnackBar('Login successful', 'Close');

          if (user.role === 'student') {
            this.router.navigate(['/schedule']);
          } else if (user.role === 'advisor') {
            this.router.navigate(['/enrollment']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.openSnackBar('Login failed', 'Close');
        }
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
