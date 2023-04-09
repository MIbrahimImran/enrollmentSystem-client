import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { CoursePageComponent } from './course-page.component';
import { AgGridModule } from 'ag-grid-angular';
import { CourseModule } from 'src/app/features/course/course.module';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [CoursePageComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    CourseModule,
    AgGridModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
})
export class CoursePageModule {}
