import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestClassesComponent } from './request-classes.component';

describe('RequestClassesComponent', () => {
  let component: RequestClassesComponent;
  let fixture: ComponentFixture<RequestClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
