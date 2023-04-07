import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi } from 'ag-grid-community';
import { AddEnrollmentDialogComponent } from 'src/app/features/enrollment/components/add-enrollment-dialog/add-enrollment-dialog.component';
import { EnrollmentT } from 'src/app/features/enrollment/interfaces/enrollment.interface';
import { EnrollmentPageService } from './enrollment-page.service';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-enrollment-page',
  templateUrl: './enrollment-page.component.html',
  styleUrls: ['./enrollment-page.component.scss'],
})
export class EnrollmentPageComponent implements OnDestroy {
  public selectedRowCount = 0;

  public filters = ['Student ID', 'Course ID', 'Course Title'];

  private gridApi: GridApi | undefined;

  public rowData: EnrollmentT[] = [];
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private enrollmentPageService: EnrollmentPageService
  ) {
    this.enrollmentPageService
      .getAllEnrollments()
      .pipe(takeUntil(this.destroy$))
      .subscribe((enrollments) => {
        this.rowData = enrollments;
      });
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
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((enrollment) =>
          this.enrollmentPageService.createEnrollment(enrollment)
        )
      )
      .subscribe((enrollment) => {
        this.rowData = [...this.rowData, enrollment];
        this.gridApi?.setRowData(this.rowData);
      });
  }

  deleteEnrollment(): void {
    const selectedNodes = this.gridApi?.getSelectedNodes();
    if (selectedNodes) {
      const selectedData = selectedNodes.map((node) => node.data);
      selectedData.forEach((enrollment) => {
        this.enrollmentPageService
          .deleteEnrollment(enrollment.enrollmentID)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.rowData = this.rowData.filter(
              (e) => e.enrollmentID !== enrollment.enrollmentID
            );
          });
      });
      this.gridApi?.setRowData(this.rowData);
      this.updateSelectedRowCount();
    }
  }

  updateSelectedRowCount(): void {
    if (this.gridApi) {
      this.selectedRowCount = this.gridApi.getSelectedNodes().length;
    }
  }

  onSearchQuery(query: any): void {
    console.log(query);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
