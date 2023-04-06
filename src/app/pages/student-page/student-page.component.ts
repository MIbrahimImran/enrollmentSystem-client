import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi } from 'ag-grid-community';
import { AddStudentDialogComponent } from 'src/app/features/student/components/add-student-dialog/add-student-dialog.component';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss'],
})
export class StudentPageComponent {
  public selectedRowCount = 0;

  private gridApi: GridApi | undefined;
  public rowData;
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  constructor(public dialog: MatDialog) {
    this.rowData = [
      {
        studentID: 'U02463323',
        studentName: 'John Doe',
        major: 'Computer Science',
        email: 'example@example.com',
        password: 'abc123@',
      },
      {
        studentID: 'U02463323',
        studentName: 'Jane Doe',
        major: 'Computer Science',
        email: 'example@example.com',
        password: 'abc123@',
      },
    ];
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  getColumnDefs(): ColDef[] {
    return [
      { field: 'studentID', headerName: 'Student ID', width: 150 },
      { field: 'studentName', headerName: 'Student Name' },
      { field: 'major', headerName: 'Major' },
      { field: 'email', headerName: 'Email' },
      { field: 'password', headerName: 'Password' },
    ];
  }

  getDefaultColDef(): ColDef {
    return { sortable: true, resizable: true };
  }

  openAddCourseDialog(): void {
    const dialogRef = this.dialog.open(AddStudentDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.rowData.push(result);
      this.gridApi?.setRowData(this.rowData);
    });
  }

  openDeleteCourseDialog(): void {
    const selectedNodes = this.gridApi?.getSelectedNodes();
    if (selectedNodes) {
      const selectedData = selectedNodes.map((node) => node.data);
      this.rowData = this.rowData.filter(
        (course) => !selectedData.includes(course)
      );
      this.gridApi?.setRowData(this.rowData);
      this.updateSelectedRowCount();
    }
  }

  updateSelectedRowCount(): void {
    if (this.gridApi) {
      this.selectedRowCount = this.gridApi.getSelectedNodes().length;
    }
  }
}
