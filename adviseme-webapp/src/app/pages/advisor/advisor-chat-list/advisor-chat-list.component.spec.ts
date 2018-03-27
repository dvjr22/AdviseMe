import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorChatListComponent } from './advisor-chat-list.component';

describe('AdvisorChatListComponent', () => {
  let component: AdvisorChatListComponent;
  let fixture: ComponentFixture<AdvisorChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorChatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
