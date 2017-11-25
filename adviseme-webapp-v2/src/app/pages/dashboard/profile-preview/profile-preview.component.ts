import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-profile-preview',
  styleUrls: ['./profile-preview.component.scss'],
  templateUrl: './profile-preview.component.html',
})

export class ProfilePreviewComponent implements OnInit, OnDestroy {

  user: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService,
              private userService: UserService,) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
    });
  }

  ngOnInit() {

    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.joe);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
