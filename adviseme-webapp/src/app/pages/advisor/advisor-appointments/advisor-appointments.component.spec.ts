import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorAppointmentsComponent } from './advisor-appointments.component';

describe('AppointmentsComponent', () => {
  let component: AdvisorAppointmentsComponent;
  let fixture: ComponentFixture<AdvisorAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorAppointmentsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
