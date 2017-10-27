import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisementSignupComponent } from './advisement-signup.component';

describe('AdvisementSignupComponent', () => {
  let component: AdvisementSignupComponent;
  let fixture: ComponentFixture<AdvisementSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisementSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisementSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
