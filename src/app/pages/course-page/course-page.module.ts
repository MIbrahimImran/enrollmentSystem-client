import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { CoursePageComponent } from './course-page.component';
import { AgGridModule } from 'ag-grid-angular';
import { CourseModule } from 'src/app/features/course/course.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CoursePageComponent],
  imports: [
    CommonModule,
    CoreModule,
    CourseModule,
    AgGridModule,
    MatButtonModule,
  ],
})
export class CoursePageModule {}
