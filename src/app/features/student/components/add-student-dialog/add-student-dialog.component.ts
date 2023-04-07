import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss'],
})
export class AddStudentDialogComponent {
  studentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.studentForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      major: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.dialogRef.close(this.studentForm.value);
    }
  }
}
