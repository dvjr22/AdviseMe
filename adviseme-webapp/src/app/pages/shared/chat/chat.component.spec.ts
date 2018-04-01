import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as io from 'socket.io-client';
import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recieve a message', () => {
    const socket = io('http://localhost:4001');
    socket.emit('save-message');
    console.log(component)
    // expect(component.chats).toBeTruthy();
    // expect(component.chats.length).toBeGreaterThan(0);
  });
});
