import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard-page',
  templateUrl: './user-dashboard-page.component.html',
  styleUrls: ['./user-dashboard-page.component.scss'],
})
export class UserDashboardPageComponent {
  public statistics = [] as any;

  constructor() {
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
}
