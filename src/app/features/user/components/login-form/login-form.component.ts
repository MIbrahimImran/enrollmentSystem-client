import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserLoginI } from 'src/app/features/user/interface/user-login.interface';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      studentID: '',
      password: '',
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.userService
        .authenticateUser(this.loginForm.value)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar('Login successful', 'Close');
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
