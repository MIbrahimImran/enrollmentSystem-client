import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi } from 'ag-grid-community';
import { AddStudentDialogComponent } from 'src/app/features/student/components/add-student-dialog/add-student-dialog.component';
import { StudentT } from 'src/app/features/student/interfaces/student.interface';
import { StudentPageService } from './student-page.service';
import { Subject, filter, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss'],
})
export class StudentPageComponent implements OnDestroy {
  public selectedRowCount = 0;

  public filters = ['Student ID', 'Student Name'];

  private gridApi: GridApi | undefined;
  public rowData: StudentT[] = [];
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private studentPageService: StudentPageService
  ) {
    this.studentPageService
      .getAllStudents()
      .pipe(takeUntil(this.destroy$))
      .subscribe((students) => {
        this.rowData = students;
      });
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
          });
      });
      this.updateSelectedRowCount();
    }
  }

  updateSelectedRowCount(): void {
    if (this.gridApi) {
      this.selectedRowCount = this.gridApi.getSelectedNodes().length;
    }
  }

  onSearchQuery(query: any): void {
    if (query) {
      console.log(query);
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
        this.rowData = students;
      });
  }

  getStudentByID(studentID: string): void {
    this.studentPageService
      .getStudentByID(studentID)
      .pipe(takeUntil(this.destroy$))
      .subscribe((student) => {
        this.rowData = [student];
      });
  }

  getStudentsByName(studentName: string): void {
    this.studentPageService
      .getStudentsByName(studentName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((students) => {
        this.rowData = students;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
