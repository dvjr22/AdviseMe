import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestComponent } from './student-requests.component';

describe('RequestsClassComponent', () => {
  let component: StudentRequestComponent;
  let fixture: ComponentFixture<StudentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRequestComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
