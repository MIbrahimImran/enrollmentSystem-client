import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { CoursePageComponent } from './course-page.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [CoursePageComponent],
  imports: [CommonModule, CoreModule, AgGridModule],
})
export class CoursePageModule {}
