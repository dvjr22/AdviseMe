import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import { AuthenticationService } from '../../../_shared/services/authentication.service';
import { CacheService, CacheKeys } from '../../../_shared/services/cache.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  isLandingPage = true;
  currentUser: User;
  fullName: string;
  @Input() position = 'normal';

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private cacheService: CacheService) {
  }

  studentMenu = [
    {
      title: 'Cart',
      link: '/pages/student/cart',
    }, {
      title: 'Profile',
      link: '/pages/shared/profile-view',
    }, {
      title: 'Log out',
      link: '/auth/logout',
    }];

    upperMenu = [
      {
        title: 'Profile',
        link: '/pages/shared/profile-view',
      }, {
        title: 'Log out',
        link: '/auth/logout',
      }];

  ngOnInit() {
    if (this.router.url !== '/landing') {
      this.isLandingPage = false;
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.cacheService.get(CacheKeys.currentUser, this.userService.getCurrentUser())
          .subscribe(res => {
            this.currentUser = res;
            this.fullName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
            if (this.currentUser.profilePicture !== null && this.currentUser.profilePicture !== undefined) {
              this.currentUser.profilePicture = '/uploads/' + this.currentUser.profilePicture;
            }
        });
    }
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

  goToCart() {
    this.router.navigate(['/pages/student/cart']);
  }
  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
