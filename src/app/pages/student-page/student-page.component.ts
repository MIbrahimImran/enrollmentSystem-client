import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi } from 'ag-grid-community';
import { AddStudentDialogComponent } from 'src/app/features/student/components/add-student-dialog/add-student-dialog.component';
import { StudentT } from 'src/app/features/student/interfaces/student.interface';
import { StudentPageService } from './student-page.service';
import { Subject, filter, switchMap, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EditStudentDialogComponent } from 'src/app/features/student/components/edit-student-dialog/edit-student-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss'],
})
export class StudentPageComponent implements OnDestroy {
  currentUserRole: string;
  public selectedRowCount = 0;

  public filters = ['Student ID', 'Student Name'];

  private gridApi: GridApi | undefined;
  public rowData: StudentT[] = [];
  public columnDefs: ColDef[];
  public defaultColDef: ColDef = this.getDefaultColDef();

  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private studentPageService: StudentPageService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.currentUserRole = this.authService.currentUserValue.role;
    this.studentPageService
      .getAllStudents()
      .pipe(takeUntil(this.destroy$))
      .subscribe((students) => {
        students = students.filter(
          (student) =>
            student.studentID !== this.authService.currentUserValue.studentID
        );
        this.rowData = students;
      });

    this.columnDefs = this.getColumnDefs();
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  getColumnDefs(): ColDef[] {
    const columnDefs: ColDef[] = [
      { field: 'studentID', headerName: 'Student ID', width: 150 },
      { field: 'studentName', headerName: 'Student Name' },
      { field: 'major', headerName: 'Major' },
      { field: 'email', headerName: 'Email', width: 300 },
    ];

    if (this.currentUserRole === 'registrar') {
      columnDefs.push(
        { field: 'password', headerName: 'Password' },
        { field: 'role', headerName: 'Role' }
      );
    }

    return columnDefs;
  }

  getDefaultColDef(): ColDef {
    return { sortable: true, resizable: true, editable: true };
  }

  editStudent(): void {
    const selectedNodes = this.gridApi?.getSelectedNodes();
    if (selectedNodes) {
      if (selectedNodes.length > 1) {
        this.openSnackBar('Please select only one student to edit.', 'Close');
        return;
      }

      const selectedData = selectedNodes.map((node) => node.data);

      const dialogRef = this.dialog.open(EditStudentDialogComponent, {
        data: selectedData[0],
      });

      dialogRef
        .afterClosed()
        .pipe(
          takeUntil(this.destroy$),
          filter((student) => !!student),
          switchMap((student) => this.studentPageService.updateStudent(student))
        )
        .subscribe((student) => {
          this.rowData = this.rowData.map((s) =>
            s.studentID === student.studentID ? student : s
          );

          this.openSnackBar('Student updated successfully.', 'Close');
        });
    }
  }

  openAddStudentDialog(): void {
    const dialogRef = this.dialog.open(AddStudentDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((student) => !!student),
        switchMap((student) => this.studentPageService.createStudent(student))
      )
      .subscribe((student) => {
        this.rowData = [...this.rowData, student];
        this.openSnackBar(`${student.role} added successfully.`, 'Close');
      });
  }

  deleteStudent(): void {
    const selectedNodes = this.gridApi?.getSelectedNodes();
    if (selectedNodes) {
      const selectedData = selectedNodes.map((node) => node.data);
      selectedData.forEach((student) => {
        this.studentPageService
          .deleteStudent(student.studentID)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.rowData = this.rowData.filter(
              (s) => s.studentID !== student.studentID
            );
            this.gridApi?.deselectAll();
            this.openSnackBar(`${student.role} deleted successfully.`, 'Close');
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
        case 'Student ID':
          this.getStudentByID(query.input);
          break;
        case 'Student Name':
          this.getStudentsByName(query.input);
          break;
        default:
          this.getAllStudents();
          break;
      }
    }
  }

  getAllStudents(): void {
    this.studentPageService
      .getAllStudents()
      .pipe(takeUntil(this.destroy$))
      .subscribe((students) => {
        students = students.filter(
          (student) =>
            student.studentID !== this.authService.currentUserValue.studentID
        );
        this.rowData = students;

        if (!students.length) {
          this.openSnackBar('No students found.', 'Close');
        }
      });
  }

  getStudentByID(studentID: string): void {
    this.studentPageService
      .getStudentByID(studentID)
      .pipe(takeUntil(this.destroy$))
      .subscribe((student) => {
        if (student.length === 1) {
          this.rowData = student;
        } else {
          this.rowData = [];
        }

        if (!student.length) {
          this.openSnackBar('No students found.', 'Close');
        }
      });
  }

  getStudentsByName(studentName: string): void {
    this.studentPageService
      .getStudentsByName(studentName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((students) => {
        this.rowData = students;

        if (!students.length) {
          this.openSnackBar('No students found.', 'Close');
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
