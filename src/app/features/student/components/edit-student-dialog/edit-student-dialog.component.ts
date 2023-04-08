import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddStudentDialogComponent } from '../add-student-dialog/add-student-dialog.component';
import { StudentT } from '../../interfaces/student.interface';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss'],
})
export class EditStudentDialogComponent {
  studentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public student: StudentT,
    private formBuilder: FormBuilder
  ) {
    this.studentForm = this.formBuilder.group({
      studentName: [student.studentName, Validators.required],
      major: [student.major, Validators.required],
      role: [student.role, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.dialogRef.close({
        ...this.studentForm.value,
        studentID: this.student.studentID,
        email: this.student.email,
        password: this.student.password,
      });
    }
  }
}
