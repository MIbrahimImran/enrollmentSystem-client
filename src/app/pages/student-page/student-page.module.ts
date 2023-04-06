import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentPageComponent } from './student-page.component';
import { CoreModule } from 'src/app/core/core.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [StudentPageComponent],
  imports: [CommonModule, CoreModule, AgGridModule],
})
export class StudentPageModule {}
