import { Injectable } from '@angular/core';
import { UserLoginI } from '../interface/user-login.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  authenticateUser(user: UserLoginI): Observable<boolean> {
    if (user.studentID === '12345678' && user.password === '12345678') {
      return of(true);
    } else {
      return of(false);
    }
  }
}
