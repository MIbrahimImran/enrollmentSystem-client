import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi } from 'ag-grid-community';
import { AddCourseDialogComponent } from 'src/app/features/course/components/add-course-dialog/add-course-dialog.component';
import { CourseT } from 'src/app/features/course/interfaces/course.interface';
import { CoursePageService } from './course-page.service';
import { Subject, catchError, filter, switchMap, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EditCourseDialogComponent } from 'src/app/features/course/components/edit-course-dialog/edit-course-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Papa from 'papaparse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnDestroy {
  currentUserRole: string;
  public selectedRowCount = 0;

  public filters = [
    'Instructor',
    'Course ID',
    'Course Title',
    'Top N by Enrollments',
  ];

  private gridApi: GridApi | undefined;

  public rowData: CourseT[] = [];
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private coursePageService: CoursePageService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.currentUserRole = this.authService.currentUserValue.role;
    this.getAllCourses();
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
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((course) => !!course),
        switchMap((course) => this.coursePageService.createCourse(course)),
        catchError((response: HttpErrorResponse) => {
          this.openSnackBar(`${response.error.message}.`, 'Close');
          return [];
        })
      )
      .subscribe((course) => {
        this.rowData = [...this.rowData, course];
        this.openSnackBar('Course added successfully!', 'Close');
      });
  }

  editCourse(): void {
    const selectedNodes = this.gridApi?.getSelectedNodes();
    if (selectedNodes) {
      if (selectedNodes.length > 1) {
        this.openSnackBar('Please select only one course to edit.', 'Close');
        return;
      }

      const selectedData = selectedNodes.map((node) => node.data);

      const dialogRef = this.dialog.open(EditCourseDialogComponent, {
        data: selectedData[0],
      });

      dialogRef
        .afterClosed()
        .pipe(
          takeUntil(this.destroy$),
          filter((course) => !!course),
          switchMap((course) => this.coursePageService.updateCourse(course))
        )
        .subscribe((course) => {
          this.rowData = this.rowData.map((courseItem) =>
            courseItem.courseID === course.courseID ? course : courseItem
          );
          this.gridApi?.deselectAll();
        });
    }
  }

  deleteCourses(): void {
    const selectedNodes = this.gridApi?.getSelectedNodes();
    if (selectedNodes) {
      const selectedData = selectedNodes.map((node) => node.data);

      selectedData.forEach((course) => {
        this.coursePageService
          .deleteCourse(course.courseID)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.rowData = this.rowData.filter(
              (courseItem) => courseItem.courseID !== course.courseID
            );
            this.gridApi?.deselectAll();
            this.openSnackBar('Course deleted successfully!', 'Close');
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
        case 'Instructor':
          this.getCoursesByInstructor(query.input);
          break;
        case 'Course ID':
          this.getCoursesByID(query.input);
          break;
        case 'Course Title':
          this.getCoursesByTitle(query.input);
          break;
        case 'Top N by Enrollments':
          this.getTopNCoursesByEnrollment(query.input);
          break;
        default:
          this.getAllCourses();
          break;
      }
    }
  }

  getAllCourses(): void {
    this.coursePageService
      .getAllCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.rowData = courses;
        if (!courses.length) {
          this.openSnackBar('No courses found.', 'Close');
        }
      });
  }

  getCoursesByTitle(title: string): void {
    this.coursePageService
      .getCoursesByTitle(title)
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.rowData = courses;
        if (!courses.length) {
          this.openSnackBar('No courses found.', 'Close');
        }
      });
  }

  getCoursesByInstructor(instructor: string): void {
    this.coursePageService
      .getCoursesByInstructor(instructor)
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.rowData = courses;
        if (!courses.length) {
          this.openSnackBar('No courses found.', 'Close');
        }
      });
  }

  getCoursesByID(courseID: string): void {
    this.coursePageService
      .getCourseByID(courseID)
      .pipe(takeUntil(this.destroy$))
      .subscribe((course) => {
        if (course !== null) {
          this.rowData = [course];
        } else {
          this.rowData = [];
        }

        if (!this.rowData.length) {
          this.openSnackBar('No courses found.', 'Close');
        }
      });
  }

  getTopNCoursesByEnrollment(n: string): void {
    const parsedN = parseInt(n, 10);

    if (isNaN(parsedN) || parsedN <= 0 || !Number.isInteger(parsedN)) {
      this.openSnackBar('Please enter a positive integer.', 'Close');
      return;
    }

    this.coursePageService
      .getTopNCoursesByEnrollment(parsedN)
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.rowData = courses;
        if (!courses.length) {
          this.openSnackBar('No courses found.', 'Close');
        }
      });
  }

  onDownloadCsv(): void {
    const columnKeys = this.columnDefs
      .map((colDef) => colDef.field)
      .filter((field): field is string => !!field);

    this.gridApi?.exportDataAsCsv({
      columnKeys,
      processHeaderCallback: (params) => {
        const fieldName = params.column.getColDef().field;
        return fieldName ? fieldName : '';
      },
    });

    this.openSnackBar('CSV downloaded successfully!', 'Close');
  }

  async onUploadCsv(): Promise<void> {
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker({
        types: [
          {
            description: 'CSV Files',
            accept: {
              'text/csv': ['.csv'],
            },
          },
        ],
      });
      const file = await fileHandle.getFile();
      this.readCsv(file);
    } catch (error) {
      this.openSnackBar('Error while reading file.', 'Close');
    }
  }

  private readCsv(file: File): void {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const csvData = reader.result as string;
      this.processCsvData(csvData);
    };

    reader.onerror = (error) => {
      this.openSnackBar('Error while reading file.', 'Close');
    };
  }

  private processCsvData(csvData: string): void {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.error('CSV parsing errors:', results.errors);
          return;
        }

        const courses: CourseT[] = results.data.map((row: any) => {
          return {
            courseID: row.courseID,
            title: row.title,
            instructor: row.instructor,
            credits: parseInt(row.credits, 10),
          };
        });

        courses.forEach((course) => {
          this.validateCourse(course) &&
            this.coursePageService.createCourse(course).subscribe((course) => {
              this.rowData = [...this.rowData, course];
            });
        });
      },
    });

    this.openSnackBar('CSV uploaded successfully!', 'Close');
  }

  private validateCourse(course: CourseT): boolean {
    console.log(course);
    const { courseID, title, instructor, credits } = course;

    if (
      !courseID ||
      !title ||
      !instructor ||
      !Number.isInteger(credits) ||
      credits < 0
    ) {
      this.openSnackBar('Invalid course data.', 'Close');
      return false;
    }

    return true;
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
