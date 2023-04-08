import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CourseT } from 'src/app/features/course/interfaces/course.interface';
import { CoursePageService } from 'src/app/pages/course-page/course-page.service';

@Component({
  selector: 'app-add-enrollment-dialog',
  templateUrl: './add-enrollment-dialog.component.html',
  styleUrls: ['./add-enrollment-dialog.component.scss'],
})
export class AddEnrollmentDialogComponent {
  courses: CourseT[] = [];
  enrollmentForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<AddEnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private coursePageService: CoursePageService
  ) {
    this.enrollmentForm = this.formBuilder.group({
      studentID: ['', Validators.required],
      courseID: ['', Validators.required],
    });

    this.coursePageService
      .getAllCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.courses = courses;
      });
  }

  onSubmit(): void {
    if (this.enrollmentForm.valid) {
      this.dialogRef.close(this.enrollmentForm.value);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
