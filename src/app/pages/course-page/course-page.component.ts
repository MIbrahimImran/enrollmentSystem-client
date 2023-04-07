import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi } from 'ag-grid-community';
import { AddCourseDialogComponent } from 'src/app/features/course/components/add-course-dialog/add-course-dialog.component';
import { CourseT } from 'src/app/features/course/interfaces/course.interface';
import { CoursePageService } from './course-page.service';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnDestroy {
  public selectedRowCount = 0;

  public filters = ['Instructor', 'Course ID', 'Course Title'];

  private gridApi: GridApi | undefined;

  public rowData: CourseT[] = [];
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private coursePageService: CoursePageService
  ) {
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
        switchMap((course) => this.coursePageService.createCourse(course))
      )
      .subscribe((course) => {
        this.rowData = [...this.rowData, course];
      });
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
        case 'Instructor':
          this.getCoursesByInstructor(query.input);
          break;
        case 'Course ID':
          this.getCoursesByID(query.input);
          break;
        case 'Course Title':
          this.getCoursesByTitle(query.input);
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
      });
  }

  getCoursesByTitle(title: string): void {
    this.coursePageService
      .getCoursesByTitle(title)
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.rowData = courses;
      });
  }

  getCoursesByInstructor(instructor: string): void {
    this.coursePageService
      .getCoursesByInstructor(instructor)
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.rowData = courses;
      });
  }

  getCoursesByID(courseID: string): void {
    this.coursePageService
      .getCourseByID(courseID)
      .pipe(takeUntil(this.destroy$))
      .subscribe((course) => {
        this.rowData = [course];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
