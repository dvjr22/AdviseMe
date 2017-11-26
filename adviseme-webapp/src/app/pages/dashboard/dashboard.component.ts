import { Component, OnInit } from '@angular/core';

import { User } from '../../_shared/models/user';
import { UserService } from '../../_shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  signedIn: boolean;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.signedIn = false;

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser) {
      this.signedIn = true;
    }
  }

}
