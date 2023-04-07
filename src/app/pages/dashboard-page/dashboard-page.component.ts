import { Component, OnDestroy } from '@angular/core';
import { DashboardPageService } from './dashboard-page.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnDestroy {
  public statistics = [] as any;

  private destroy$ = new Subject<void>();

  constructor(private dashboardPageService: DashboardPageService) {
    this.statistics = this.getStatistics();
  }

  getStatistics() {
    return [
      {
        title: 'Students',
        value: 12,
      },
      {
        title: 'Courses',
        value: 10,
      },
      {
        title: 'Enrollments',
        value: 100,
      },
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
