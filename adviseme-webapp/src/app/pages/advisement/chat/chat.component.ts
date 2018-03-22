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

  room: string;

  roomName: string;

  // Initialize objects for holding user and msg data
  newUser = { nickname: '', room: '' };
  msgData = { room: '', nickname: '', message: '' };

  // Connection to the socket server for realtime chat updates
  socket = io('http://localhost:4001');

  joinned = true;

  currentUser: User;

  constructor(private chatService: ChatService, private userService: UserService) {}

  ngOnInit() {
    // Get the current user information
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id).subscribe((res) => {
      // Set the currentUser variable and format the profile picture url
      this.formatCurrentUser(res);
      // Set the room id to a combination of the two user ids
      this.setRoom(this.currentUser);
      // Set the header name for the chat
      this.setRoomName();
      // Assign message data for what is shown in the message input box
      this.assignMsgData('');
    });
    // Load all old chat messages
    this.joinRoom();
    // Set up the socket io watch for new messages from the advisor
    this.watchForMessages();
  }
  formatCurrentUser(data: any) {
    this.currentUser = data;
    if (this.currentUser.profilePicture !== null && this.currentUser.profilePicture !== undefined) {
      this.currentUser.profilePicture = '/uploads/' + this.currentUser.profilePicture;
    }
  }
  setRoom(user: User) {
    // TODO: Change this based off the role
    this.room = user._id + user.advisor;
  }
  setRoomName() {
    this.userService.getById(this.currentUser.advisor).subscribe((advisorRes) => {
      this.roomName = advisorRes.firstName + ' ' + advisorRes.lastName;
    });
  }
   assignMsgData(message: string) {
     if (this.currentUser !== null && this.currentUser !== undefined) {
       // Set the message data with the current users information
       this.msgData = { room: this.room, nickname: this.currentUser.firstName + ' ' + this.currentUser.lastName, message: message };
       // Scroll the message view to the bottom
       this.scrollToBottom();
     }
   }

  watchForMessages() {
    // Recieve the new message push from the socket server
    this.socket.on('new-message', function (data) {
      console.log('recieved message: ', data)
      // If the message belongs in this room then display it
      // TODO: Check for the right room
      console.log('userdata', this.currentUser, data.message)
        if (data.message.data !== undefined && data.message.data.room === this.room) {
          // Push the message onto the chats object
          this.chats.push(data.message.data);
          console.log('this.chats',this.chats)
          this.msgData = { room: this.room, nickname: this.currentUser.firstName + ' ' + this.currentUser.lastName, message: '' };
        }
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
    }, (err) => { console.log(err) });
  }

  joinRoom() {
    const date = new Date();
    this.userService.getById(this.currentUser._id).subscribe((res) => {
      this.currentUser = res;
      this.getChatByRoom(this.room);
      this.msgData = { room: this.room, nickname: this.currentUser.firstName + ' ' + this.currentUser.lastName, message: '' };
      this.joinned = true;
      this.socket.emit('save-message', { room: this.room,
        nickname: this.currentUser.firstName + ' ' + this.currentUser.lastName, message: 'Join this room', updated_at: date });
    });
  }

  sendMessage() {
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
    }, (err) => { });
  }
}
