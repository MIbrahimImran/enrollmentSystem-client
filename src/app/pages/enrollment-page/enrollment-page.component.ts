import { Component } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-enrollment-page',
  templateUrl: './enrollment-page.component.html',
  styleUrls: ['./enrollment-page.component.scss'],
})
export class EnrollmentPageComponent {
  public rowData;
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  constructor() {
    this.rowData = [
      {
        studentID: 'U02463323',
        studentName: 'John Doe',
        courseID: 'CSC 436',
        title: 'Software Engineering',
        enrollmentID: '1',
      },
      {
        studentID: 'U02463323',
        studentName: 'Jane Doe',
        courseID: 'CSC 437',
        title: 'Software Testing',
        enrollmentID: '2',
      },
      {
        studentID: 'U02463323',
        studentName: 'John Smith',
        courseID: 'CSC 438',
        title: 'Software Project Management',
        enrollmentID: '3',
      },
    ];
  }

  getColumnDefs(): ColDef[] {
    return [
      { field: 'courseID', headerName: 'Course ID', width: 150 },
      { field: 'title', headerName: 'Course Title', width: 300 },
      { field: 'studentID', headerName: 'Student ID', width: 150 },
      { field: 'studentName', headerName: 'Student Name' },
      { field: 'enrollmentID', headerName: 'Enrollment ID' },
    ];
  }

  getDefaultColDef(): ColDef {
    return { sortable: true, resizable: true };
  }
}
