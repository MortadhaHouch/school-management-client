import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeScheduleAdminComponent } from './time-schedule-admin.component';

describe('TimeScheduleAdminComponent', () => {
  let component: TimeScheduleAdminComponent;
  let fixture: ComponentFixture<TimeScheduleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeScheduleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeScheduleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
