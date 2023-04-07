import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi } from 'ag-grid-community';
import { AddEnrollmentDialogComponent } from 'src/app/features/enrollment/components/add-enrollment-dialog/add-enrollment-dialog.component';
import { EnrollmentT } from 'src/app/features/enrollment/interfaces/enrollment.interface';

@Component({
  selector: 'app-enrollment-page',
  templateUrl: './enrollment-page.component.html',
  styleUrls: ['./enrollment-page.component.scss'],
})
export class EnrollmentPageComponent {
  public selectedRowCount = 0;

  private gridApi: GridApi | undefined;

  public rowData: EnrollmentT[];
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  constructor(public dialog: MatDialog) {
    this.rowData = [
      {
        studentID: 'U02463323',
        studentName: 'John Doe',
        courseID: 'CSC 436',
        title: 'Software Engineering',
        enrollmentID: 1,
      },
      {
        studentID: 'U02463323',
        studentName: 'Jane Doe',
        courseID: 'CSC 437',
        title: 'Software Testing',
        enrollmentID: 2,
      },
      {
        studentID: 'U02463323',
        studentName: 'John Smith',
        courseID: 'CSC 438',
        title: 'Software Project Management',
        enrollmentID: 3,
      },
    ];
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
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

  openAddEnrollmentDialog(): void {
    const dialogRef = this.dialog.open(AddEnrollmentDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.rowData.push(result);
      this.gridApi?.setRowData(this.rowData);
    });
  }

  openDeleteEnrollmentDialog(): void {
    const selectedNodes = this.gridApi?.getSelectedNodes();
    if (selectedNodes) {
      const selectedData = selectedNodes.map((node) => node.data);
      this.rowData = this.rowData.filter(
        (enrollment) => !selectedData.includes(enrollment)
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
