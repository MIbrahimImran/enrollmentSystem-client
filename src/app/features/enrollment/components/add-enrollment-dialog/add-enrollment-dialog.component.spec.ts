import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnrollmentDialogComponent } from './add-enrollment-dialog.component';

describe('AddEnrollmentDialogComponent', () => {
  let component: AddEnrollmentDialogComponent;
  let fixture: ComponentFixture<AddEnrollmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEnrollmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnrollmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
