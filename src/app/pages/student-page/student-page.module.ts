import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentPageComponent } from './student-page.component';
import { CoreModule } from 'src/app/core/core.module';
import { AgGridModule } from 'ag-grid-angular';
import { StudentModule } from 'src/app/features/student/student.module';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [StudentPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AgGridModule,
    StudentModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class StudentPageModule {}
