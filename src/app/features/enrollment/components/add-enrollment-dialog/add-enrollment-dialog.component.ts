import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { CourseT } from 'src/app/features/course/interfaces/course.interface';
import { StudentT } from 'src/app/features/student/interfaces/student.interface';
import { CoursePageService } from 'src/app/pages/course-page/course-page.service';
import { StudentPageService } from 'src/app/pages/student-page/student-page.service';

@Component({
  selector: 'app-add-enrollment-dialog',
  templateUrl: './add-enrollment-dialog.component.html',
  styleUrls: ['./add-enrollment-dialog.component.scss'],
})
export class AddEnrollmentDialogComponent implements OnDestroy {
  courses: CourseT[] = [];
  students: StudentT[] = [];
  enrollmentForm: FormGroup;

  filteredStudents: Observable<StudentT[]>;

  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<AddEnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private coursePageService: CoursePageService,
    private studentPageService: StudentPageService
  ) {
    this.enrollmentForm = this.formBuilder.group({
      studentID: ['', Validators.required],
      courseID: ['', Validators.required],
    });

    this.studentPageService
      .getAllStudents()
      .pipe(takeUntil(this.destroy$))
      .subscribe((students) => {
        this.students = students;
      });

    this.coursePageService
      .getAllCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.courses = courses;
      });

    this.filteredStudents = this.enrollmentForm.controls[
      'studentID'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filterStudents(value))
    );
  }

  onSubmit(): void {
    if (this.enrollmentForm.valid) {
      this.dialogRef.close(this.enrollmentForm.value);
    }
  }

  private _filterStudents(value: string): StudentT[] {
    const filterValue = value.toLowerCase();

    return this.students.filter((student) =>
      student.studentID.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
