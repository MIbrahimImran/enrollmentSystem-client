import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.scss'],
})
export class AddCourseDialogComponent {
  courseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.courseForm = this.formBuilder.group({
      courseID: ['', Validators.required],
      title: ['', Validators.required],
      instructor: ['', Validators.required],
      credits: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}
