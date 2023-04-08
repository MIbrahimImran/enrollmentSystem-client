import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';
import { CourseT } from '../../interfaces/course.interface';

@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.scss'],
})
export class EditCourseDialogComponent {
  courseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public course: CourseT,
    private formBuilder: FormBuilder
  ) {
    this.courseForm = this.formBuilder.group({
      courseID: [
        { value: course.courseID, disabled: true },
        Validators.required,
      ],
      title: [course.title, Validators.required],
      instructor: [course.instructor, Validators.required],
      credits: [
        course.credits,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.dialogRef.close({
        ...this.courseForm.value,
        courseID: this.course.courseID,
      });
    }
  }
}
