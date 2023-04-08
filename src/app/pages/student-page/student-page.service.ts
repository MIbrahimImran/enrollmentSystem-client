import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentT } from 'src/app/features/student/interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentPageService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<StudentT[]> {
    return this.http.get<StudentT[]>(`${this.apiUrl}`);
  }

  getStudentByID(studentID: string): Observable<StudentT[]> {
    return this.http.get<StudentT[]>(`${this.apiUrl}/${studentID}`);
  }

  getStudentsByName(studentName: string): Observable<StudentT[]> {
    return this.http.get<StudentT[]>(`${this.apiUrl}/name/${studentName}`);
  }

  getStudentCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  createStudent(student: StudentT): Observable<StudentT> {
    return this.http.post<StudentT>(`${this.apiUrl}`, student);
  }

  deleteStudent(studentID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${studentID}`);
  }
}
