import { Component } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { EnrollmentPageService } from '../enrollment-page/enrollment-page.service';
import { AuthService } from 'src/app/auth/auth.service';
import { EnrollmentT } from 'src/app/features/enrollment/interfaces/enrollment.interface';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
})
export class SchedulePageComponent {
  private gridApi: GridApi | undefined;

  public rowData: EnrollmentT[] = [];
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  constructor(
    private readonly enrollmentService: EnrollmentPageService,
    private readonly authService: AuthService
  ) {
    const currentUser = this.authService.currentUserValue;
    this.enrollmentService
      .getEnrollmentsByStudentID(currentUser.studentID)
      .subscribe((enrollments) => {
        this.rowData = enrollments;
      });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  getColumnDefs(): ColDef[] {
    return [
      { field: 'enrollmentID', headerName: 'Enrollment ID', width: 150 },
      { field: 'courseID', headerName: 'Course ID', width: 150 },
      { field: 'courseTitle', headerName: 'Course Title', width: 300 },
      { field: 'courseCredit', headerName: 'Course Credit', width: 150 },
      {
        field: 'courseInstructor',
        headerName: 'Course Instructor',
        width: 300,
      },
    ];
  }

  getDefaultColDef(): ColDef {
    return { sortable: true, resizable: true };
  }

  onBtnExportData(): void {
    this.gridApi?.exportDataAsCsv();
  }
}
