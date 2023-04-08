import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-enrollment-dialog',
  templateUrl: './add-enrollment-dialog.component.html',
  styleUrls: ['./add-enrollment-dialog.component.scss'],
})
export class AddEnrollmentDialogComponent {
  enrollmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.enrollmentForm = this.formBuilder.group({
      studentID: ['', Validators.required],
      courseID: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.enrollmentForm.valid) {
      this.dialogRef.close(this.enrollmentForm.value);
    }
  }
}
