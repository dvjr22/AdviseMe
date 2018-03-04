import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcoursesComponent } from './editcourses.component';

describe('EditcoursesComponent', () => {
  let component: EditcoursesComponent;
  let fixture: ComponentFixture<EditcoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
