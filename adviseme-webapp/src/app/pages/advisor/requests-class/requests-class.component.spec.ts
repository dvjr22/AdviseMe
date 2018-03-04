import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsClassComponent } from './requests-class.component';

describe('RequestsClassComponent', () => {
  let component: RequestsClassComponent;
  let fixture: ComponentFixture<RequestsClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
