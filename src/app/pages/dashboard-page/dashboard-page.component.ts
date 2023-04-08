import { Component, OnDestroy } from '@angular/core';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { EnrollmentPageService } from '../enrollment-page/enrollment-page.service';
import { StudentPageService } from '../student-page/student-page.service';
import { CoursePageService } from '../course-page/course-page.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnDestroy {
  public statistics = [] as any;
  public studentCount = 0;
  public enrollmentCount = 0;
  public courseCount = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private enrollmentPageService: EnrollmentPageService,
    private studentPageService: StudentPageService,
    private coursePageService: CoursePageService
  ) {
    forkJoin({
      enrollments: this.enrollmentPageService.getAllEnrollments(),
      students: this.studentPageService.getAllStudents(),
      courses: this.coursePageService.getAllCourses(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ enrollments, students, courses }) => {
        this.enrollmentCount = enrollments.length;
        this.studentCount = students.length;
        this.courseCount = courses.length;
        this.updateStatistics();
      });
  }

  updateStatistics() {
    this.statistics = [
      {
        title: 'Students',
        count: this.studentCount,
        icon: 'person',
        color: 'primary',
      },

      {
        title: 'Courses',
        count: this.courseCount,
        icon: 'book',
        color: 'accent',
      },
      {
        title: 'Enrollments',
        count: this.enrollmentCount,
        icon: 'list',
        color: 'warn',
      },
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
