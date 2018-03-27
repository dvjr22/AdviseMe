import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { MessageService } from 'primeng/components/common/messageservice';
import * as io from 'socket.io-client';
import { UserService } from './_shared/services/user.service';
import { Router } from '@angular/router';

/**
  Component:
    For the main application
*/
@Component({
  selector: 'ngx-app',
  template: `
  <p-growl [(value)]="msgs"></p-growl>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  // Connection to the socket server for realtime chat updates
  socket = io('http://localhost:4001');

  currentUser: any;
  /**
    Initializes new names for the imports
  */
  constructor(private analytics: AnalyticsService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router) {
  }
  /**
    Tracking page analytics
  */
  ngOnInit(): void {
    this.analytics.trackPageViews();

    this.userService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
    });
    this.socket.on('new-message', function (data) {
      console.log('routerCheck', this.router.url.indexOf('chat') === -1)
      if (data.message.data !== undefined && this.router.url.indexOf('chat') === -1) {
        if (data.message.data.room.indexOf(this.currentUser.studentID) >= 0) {
          const message = data.message.data.message;
          const otherUser = data.message.data.nickname;

          this.messageService.add({severity: 'success',
            summary: 'New Message',
            detail: 'New message from ' + otherUser + ' saying: ' + message});
        }
      }
    }.bind(this));
  }
}
