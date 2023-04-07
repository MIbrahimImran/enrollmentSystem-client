import { TestBed } from '@angular/core/testing';

import { EnrollmentPageService } from './enrollment-page.service';

describe('EnrollmentPageService', () => {
  let service: EnrollmentPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
