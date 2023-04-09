import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseT } from 'src/app/features/course/interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursePageService {
  private apiUrl = 'https://enrollserver.ibrahimimran.com/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<CourseT[]> {
    return this.http.get<CourseT[]>(`${this.apiUrl}`);
  }

  getCourseByID(courseID: string): Observable<CourseT> {
    return this.http.get<CourseT>(`${this.apiUrl}/${courseID}`);
  }

  getCoursesByInstructor(instructor: string): Observable<CourseT[]> {
    return this.http.get<CourseT[]>(`${this.apiUrl}/instructor/${instructor}`);
  }

  getCoursesByTitle(title: string): Observable<CourseT[]> {
    return this.http.get<CourseT[]>(`${this.apiUrl}/title/${title}`);
  }

  getCourseCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  getTopNCoursesByEnrollment(n: number): Observable<CourseT[]> {
    return this.http.get<CourseT[]>(`${this.apiUrl}/top-enrollments/${n}`);
  }

  updateCourse(course: CourseT): Observable<CourseT> {
    return this.http.put<CourseT>(`${this.apiUrl}/update`, course);
  }

  createCourse(course: CourseT): Observable<CourseT> {
    return this.http.post<CourseT>(`${this.apiUrl}`, course);
  }

  deleteCourse(courseID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${courseID}`);
  }
}
