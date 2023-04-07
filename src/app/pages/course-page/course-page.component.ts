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
    this.coursePageService
      .getAllCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.rowData = courses;
      });
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
        this.gridApi?.setRowData(this.rowData);
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
