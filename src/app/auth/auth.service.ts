import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { StudentPageService } from '../pages/student-page/student-page.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private readonly studentPageService: StudentPageService) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(studentID: string, password: string): Observable<any> {
    return this.studentPageService.getAllStudents().pipe(
      map((students) => {
        const student = students.find((s) => s.studentID === studentID);
        if (student && student.password === password) {
          const user = {
            studentID: student.studentID,
            studentName: student.studentName,
            role: student.role,
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        } else {
          return null;
        }
      })
    );
  }

  logout() {
    // Remove the user from local storage to log the user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  hasRole(role: string): boolean {
    return this.currentUserValue && this.currentUserValue.role === role;
  }
}
