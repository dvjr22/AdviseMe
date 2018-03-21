import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../../_shared/services/chat.service';
import { UserService } from '../../../_shared/services/user.service';
import { User } from '../../../_shared/models/user';
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
  joinned = true;

  currentUser: User;

  constructor(private chatService: ChatService, private userService: UserService) {}

  ngOnInit() {

    // TODO: Replace this with a user service call
    const user = {
      room: 'test',
      nickname: 'batman',
    };
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id).subscribe((res) => {
      this.currentUser = res;
      console.log(res)

      if (this.currentUser !== null && this.currentUser !== undefined) {
        // Get the chat room for the current user
        console.log(this.currentUser)
        // Set the message data with the current users information
        this.msgData = { room: this.currentUser.studentID, nickname: this.currentUser.studentID, message: '' };
        // Trip the joinned flag
        this.joinned = true;
        // Scroll the message view to the bottom
        this.scrollToBottom();
      }
    });
    this.joinRoom()
    // Recieve the new message push from the socket server
    this.socket.on('new-message', function (data) {
      console.log('recieved message: ', data)
      // If the message belongs in this room then display it
      // TODO: Check for the right room
      console.log('userdata', this.currentUser, data.message)
        if (data.message.data !== undefined && data.message.data.room === this.currentUser.studentID) {
          // Push the message onto the chats object
          this.chats.push(data.message.data);
          console.log('this.chats',this.chats)
          this.msgData = { room: this.currentUser.studentID, nickname: this.currentUser.studentID, message: '' };
        }
    }.bind(this));
  }

  ngAfterInit() {

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
    }, (err) => { console.log(err) });
  }

  joinRoom() {
    const date = new Date();
    this.userService.getById(this.currentUser._id).subscribe((res) => {
      this.currentUser = res;
      // if (this.currentUser !== undefined) {
        this.getChatByRoom(this.currentUser.studentID); // TODO: Replace this with a user service call
        this.msgData = { room: this.currentUser.studentID, nickname: this.currentUser.studentID, message: '' };
        this.joinned = true;
        this.socket.emit('save-message', { room: this.currentUser.studentID,
          nickname: this.currentUser.studentID, message: 'Join this room', updated_at: date });
      // }
    });
  }

  sendMessage() {
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
    }, (err) => { });
  }

  // logout() {
  //   const date = new Date();
  //   this.socket.emit('save-message', { room: 'test', nickname: 'batman', message: 'Left this room', updated_at: date });
  //   this.joinned = false;
  // }
}
