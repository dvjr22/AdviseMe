import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../../_shared/services/chat.service';
import { UserService } from '../../../_shared/services/user.service';
import { User } from '../../../_shared/models/user';
import * as io from 'socket.io-client';
import { Role } from '../../../_shared/models/constants';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {

  description = '';

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
  currentUser: User;

  otherPicture: string;

  // Index of the student in the students array of the advisor user
  index;

  constructor(protected route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService) {}

  ngOnInit() {

    // If the request has an index then capture it. It won't when the student enters
    // the chat because they only have one advisor to communicate with. The advisor
    // has multiple students so this index indicates which one.
    try {
      this.index = this.route.snapshot.params['index'];
    } catch (e) {}
    // Get the current user information
    this.userService.getCurrentUser().subscribe((res) => {
      // Set the currentUser variable and format the profile picture url
      this.formatCurrentUser(res);
      // Set the room id to a combination of the two user ids
      this.setRoom(this.currentUser);
      // Set the header name for the chat
      this.setRoomName(this.currentUser);
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
    switch (user.role.toString()) {
      case 'student':
        this.room = user._id + user.advisor;
      break;
      case 'advisor':
        this.room = user.students[this.index] + user._id;
      break;
    }
  }
  setRoomName(user: User) {
    let searchId = '';
    switch (user.role.toString()) {
      case 'student':
        searchId = user.advisor;
      break;
      case 'advisor':
        searchId = user.students[this.index];
      break;
    }
    this.userService.getById(searchId).subscribe((res) => {
      this.roomName = res.firstName + ' ' + res.lastName;
      this.otherPicture = res.profilePicture;
      this.description = 'Send a message to ' + this.roomName + ' and AdviseMe will notify you when they respond';
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
      // If the message belongs in this room then display it
      if (data.message.data !== undefined && data.message.data.room === this.room) {
        // Push the message onto the chats object
        this.chats.push(data.message.data);

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
    }, (err) => {});
  }

  joinRoom() {
    const date = new Date();
    this.userService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
      this.getChatByRoom(this.room);
      this.msgData = { room: this.room, nickname: this.currentUser.firstName + ' ' + this.currentUser.lastName, message: '' };
      this.socket.emit('save-message', { room: this.room,
        nickname: this.currentUser.firstName + ' ' + this.currentUser.lastName, message: 'Join this room', updated_at: date });
    });
  }

  sendMessage() {
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', JSON.stringify(result));
    }, (err) => { });
  }
}
