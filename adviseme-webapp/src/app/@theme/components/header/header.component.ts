import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import { AuthenticationService } from '../../../_shared/services/authentication.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  currentUser = User;
  @Input() position = 'normal';

  user: any;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private authenticationService: AuthenticationService) {
  }

  userMenu = [{ title: 'Profile', link: '/pages/dashboard' }, { title: 'Log out', link: '/auth/logout' }];

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
