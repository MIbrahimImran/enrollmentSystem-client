import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi, RowSelectedEvent } from 'ag-grid-community';
import { AddCourseDialogComponent } from 'src/app/features/course/components/add-course-dialog/add-course-dialog.component';
import { CourseT } from 'src/app/features/course/interfaces/course.interface';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent {
  public selectedRowCount = 0;

  private gridApi: GridApi | undefined;

  public rowData: CourseT[];
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  constructor(public dialog: MatDialog) {
    this.rowData = [
      {
        courseID: 'CSC 436',
        title: 'Software Engineering',
        instructor: 'Dr. Kiper',
        credits: 3,
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

  onGridReady(params: any): void {
    this.gridApi = params.api;
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

  openAddCourseDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogComponent);
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
