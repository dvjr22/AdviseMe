import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../../_shared/services/chat.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'ngx-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {

  // Keep track of the scroll container
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  // The list of chat messages
  chats: any;

  // Initialize objects for holding user and msg data
  newUser = { nickname: '', room: '' };
  msgData = { room: '', nickname: '', message: '' };

  // Connection to the socket server for realtime chat updates
  socket = io('http://localhost:4001');

  // Not sure what this is for :(k
  joinned = false;


  constructor(private chatService: ChatService) {}

  ngOnInit() {

    // TODO: Replace this with a user service call
    const user = {
      room: 'test',
      nickname: 'batman',
    };

    if (user !== null) {
      // Get the chat room for the current user
      this.getChatByRoom(user.room);
      // Set the message data with the current users information
      this.msgData = { room: user.room, nickname: user.nickname, message: '' };
      // Trip the joinned flag
      this.joinned = true;
      // Scroll the message view to the bottom
      this.scrollToBottom();
    }
    // Recieve the new message push from the socket server
    this.socket.on('new-message', function (data) {
      console.log('recieved message: ', data)
      // If the message belongs in this room then display it
      // TODO: Check for the right room
      //  if (data.message.room === user.room) {
        // Push the message onto the chats object
        this.chats.push(data.message.data);
        console.log('this.chats',this.chats)
        this.msgData = { room: user.room, nickname: user.nickname, message: '' };
      //  }
    }.bind(this));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getChatByRoom(room) {
    this.chatService.getChatByRoom(room).then((res) => {
      this.chats = res;
    }, (err) => { });
  }

  joinRoom() {
    const date = new Date();
    this.getChatByRoom('test'); // TODO: Replace this with a user service call
    this.msgData = { room: 'test', nickname: 'batman', message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: 'test', nickname: 'batman', message: 'Join this room', updated_at: date });
  }

  sendMessage() {
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
    }, (err) => { });
  }

  logout() {
    const date = new Date();
    this.socket.emit('save-message', { room: 'test', nickname: 'batman', message: 'Left this room', updated_at: date });
    this.joinned = false;
  }
}
