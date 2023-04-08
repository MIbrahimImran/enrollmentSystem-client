import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentDialogComponent } from './components/add-student-dialog/add-student-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [AddStudentDialogComponent, UserMenuComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [AddStudentDialogComponent, UserMenuComponent],
})
export class StudentModule {}
