import { Component } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss'],
})
export class StudentPageComponent {
  public rowData;
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  constructor() {
    this.rowData = [
      {
        studentID: 'U02463323',
        studentName: 'John Doe',
        major: 'Computer Science',
        email: 'example@example.com',
      },
      {
        studentID: 'U02463323',
        studentName: 'Jane Doe',
        major: 'Computer Science',
        email: 'example@example.com',
      },
    ];
  }

  getColumnDefs(): ColDef[] {
    return [
      { field: 'studentID', headerName: 'Student ID', width: 150 },
      { field: 'studentName', headerName: 'Student Name' },
      { field: 'major', headerName: 'Major' },
      { field: 'email', headerName: 'Email' },
    ];
  }

  getDefaultColDef(): ColDef {
    return { sortable: true, resizable: true };
  }
}
