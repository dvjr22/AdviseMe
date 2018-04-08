import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartResetComponent } from './cart-reset.component';

describe('CartResetComponent', () => {
  let component: CartResetComponent;
  let fixture: ComponentFixture<CartResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
