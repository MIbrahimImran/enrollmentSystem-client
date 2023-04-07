import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnrollmentT } from 'src/app/features/enrollment/interfaces/enrollment.interface';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentPageService {
  private apiUrl = 'http://localhost:3000/enrollments';

  constructor(private http: HttpClient) {}

  getAllEnrollments(): Observable<EnrollmentT[]> {
    return this.http.get<EnrollmentT[]>(`${this.apiUrl}`);
  }

  getEnrollmentByID(enrollmentID: string): Observable<EnrollmentT> {
    return this.http.get<EnrollmentT>(`${this.apiUrl}/${enrollmentID}`);
  }

  getEnrollmentsByStudent(studentName: string): Observable<EnrollmentT[]> {
    return this.http.get<EnrollmentT[]>(
      `${this.apiUrl}/student/${studentName}`
    );
  }

  getEnrollmentsByCourseID(courseID: string): Observable<EnrollmentT[]> {
    return this.http.get<EnrollmentT[]>(`${this.apiUrl}/course/${courseID}`);
  }

  createEnrollment(enrollment: EnrollmentT): Observable<EnrollmentT> {
    return this.http.post<EnrollmentT>(`${this.apiUrl}`, enrollment);
  }

  deleteEnrollment(enrollmentID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${enrollmentID}`);
  }
}
