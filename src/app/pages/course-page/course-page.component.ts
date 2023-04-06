import { Component } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent {
  public rowData;
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  constructor() {
    this.rowData = [
      {
        courseID: 'CSC 436',
        title: 'Software Engineering',
        instructor: 'Dr. Kiper',
        credits: '3',
      },
      {
        courseID: 'CSC 437',
        title: 'Software Testing',
        instructor: 'Dr. Kiper',
        credits: 3,
      },
      {
        courseID: 'CSC 438',
        title: 'Software Project Management',
        instructor: 'Dr. Kiper',
        credits: 3,
      },
    ];
  }

  getColumnDefs(): ColDef[] {
    return [
      { field: 'courseID', headerName: 'Course ID', width: 150 },
      { field: 'title', headerName: 'Course Title', width: 300 },
      { field: 'instructor', headerName: 'Instructor', width: 150 },
      { field: 'credits', headerName: 'Credits', width: 150 },
    ];
  }

  getDefaultColDef(): ColDef {
    return { sortable: true, resizable: true };
  }
}
