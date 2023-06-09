import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi } from 'ag-grid-community';
import { AddEnrollmentDialogComponent } from 'src/app/features/enrollment/components/add-enrollment-dialog/add-enrollment-dialog.component';
import { EnrollmentT } from 'src/app/features/enrollment/interfaces/enrollment.interface';
import { EnrollmentPageService } from './enrollment-page.service';
import { Subject, filter, switchMap, takeUntil } from 'rxjs';
import { CourseT } from 'src/app/features/course/interfaces/course.interface';
import { CoursePageService } from '../course-page/course-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enrollment-page',
  templateUrl: './enrollment-page.component.html',
  styleUrls: ['./enrollment-page.component.scss'],
})
export class EnrollmentPageComponent implements OnDestroy {
  public selectedRowCount = 0;

  public filters = ['Student Name', 'Enrollment ID', 'Course ID'];

  private gridApi: GridApi | undefined;

  public rowData: EnrollmentT[] = [];
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  public courses: CourseT[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private enrollmentPageService: EnrollmentPageService,
    private _snackBar: MatSnackBar
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
      { field: 'enrollmentID', headerName: 'Enrollment ID', width: 150 },
      { field: 'studentID', headerName: 'Student ID', width: 150 },
      { field: 'studentName', headerName: 'Student Name' },
      { field: 'studentEmail', headerName: 'Student Email', width: 300 },
      { field: 'courseID', headerName: 'Course ID', width: 150 },
      { field: 'courseTitle', headerName: 'Course Title', width: 300 },
      {
        field: 'courseInstructor',
        headerName: 'Course Instructor',
        width: 300,
      },
      { field: 'courseCredit', headerName: 'Course Credit', width: 150 },
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
        filter((enrollment) => !!enrollment),
        switchMap((enrollment) =>
          this.enrollmentPageService.createEnrollment(enrollment)
        )
      )
      .subscribe((enrollment) => {
        this.rowData = [enrollment, ...this.rowData];
        this.openSnackBar('Enrollment added', 'Close');
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
            this.gridApi?.deselectAll();

            this.openSnackBar('Enrollment deleted', 'Close');
          });
      });
    }
  }

  updateSelectedRowCount(): void {
    if (this.gridApi) {
      this.selectedRowCount = this.gridApi.getSelectedNodes().length;
    }
  }

  onSearchQuery(query: any): void {
    if (query) {
      switch (query.filter) {
        case 'Student Name':
          this.getEnrollmentsByStudentName(query.input);
          break;
        case 'Enrollment ID':
          this.getEnrollmentByID(query.input);
          break;
        case 'Course ID':
          this.getEnrollmentsByCourseID(query.input);
          break;
        default:
          this.getAllEnrollments();
          break;
      }
    }
  }

  getAllEnrollments(): void {
    this.enrollmentPageService
      .getAllEnrollments()
      .pipe(takeUntil(this.destroy$))
      .subscribe((enrollments) => {
        this.rowData = enrollments;

        if (!enrollments.length) {
          this.openSnackBar('No enrollments found', 'Close');
        }
      });
  }

  getEnrollmentByID(enrollmentID: string): void {
    this.enrollmentPageService
      .getEnrollmentByID(enrollmentID)
      .pipe(takeUntil(this.destroy$))
      .subscribe((enrollment) => {
        if (enrollment !== null) {
          this.rowData = [enrollment];
        } else {
          this.rowData = [];
        }

        if (!enrollment) {
          this.openSnackBar('No enrollment found', 'Close');
        }
      });
  }

  getEnrollmentsByStudentName(studentName: string): void {
    this.enrollmentPageService
      .getEnrollmentsByStudentName(studentName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((enrollments) => {
        this.rowData = enrollments;

        if (!enrollments.length) {
          this.openSnackBar('No enrollments found', 'Close');
        }
      });
  }

  getEnrollmentsByCourseID(courseID: string): void {
    this.enrollmentPageService
      .getEnrollmentsByCourseID(courseID)
      .pipe(takeUntil(this.destroy$))
      .subscribe((enrollments) => {
        this.rowData = enrollments;

        if (!enrollments.length) {
          this.openSnackBar('No enrollments found', 'Close');
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
