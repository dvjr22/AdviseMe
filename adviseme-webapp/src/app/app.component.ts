import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { MessageService } from 'primeng/components/common/messageservice';
import * as io from 'socket.io-client';
import { UserService } from './_shared/services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from './_shared/services/notification.service';

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
  socket = io('http://theadviseme.com:4001');

  currentUser: any;
  /**
    Initializes new names for the imports
  */
  constructor(private analytics: AnalyticsService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService) {
  }
  /**
    Tracking page analytics
  */
  ngOnInit(): void {
    this.analytics.trackPageViews();
    if (sessionStorage.getItem('currentUser') !== undefined && sessionStorage.getItem('currentUser') !== null) {
      this.userService.getCurrentUser().subscribe((res) => {
        this.currentUser = res;
      });
      this.messageBind();
      this.cartBind();
    }
  }

  /**
    Listener for new message notifications and if its for the current user then
    display a toast notification
  */
  messageBind() {
    this.socket.on('new-message', function (data) {
      if (data.message.data !== undefined) {
        // The room id is the student and the advisor ids combined
        if (data.message.data.room.indexOf(this.currentUser._id) >= 0) {
          const message = data.message.data.message;
          const otherUser = data.message.data.nickname;
          // If opted in to sms notification send a text alerting to a new message
          if (this.currentUser.phoneNumber !== null || this.currentUser.phoneNumber !== '') {
            this.notificationService.sendNotification(JSON.stringify(data.message.data), this.currentUser.phoneNumber);
          }
          // Fire off a toast notification using PrimeNG
          this.messageService.add({severity: 'success',
            summary: 'New Message',
            detail: 'New message from ' + otherUser + ' saying: ' + message});
        }
      }
    }.bind(this));
  }

  /**
    Listener for cart status changes. Alerts the user to the status change
  */
  cartBind() {
    this.socket.on('cart-status', function (data) {
      // Text the user
      this.notificationService.sendNotification(JSON.stringify(data), this.currentUser.phoneNumber);
      // Fire a toast notification
      this.messageService.add({severity: 'success',
        summary: 'Cart Status Change',
        detail: 'Your cart status has changed: ' + JSON.stringify(data.message)});
    }.bind(this));
  }
}
