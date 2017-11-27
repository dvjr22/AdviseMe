/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbAuthService, NbAuthResult } from '../../services/auth.service';
import { AuthenticationService } from '../../../../../_shared/services/authentication.service';

@Component({
  selector: 'nb-logout',
  template: `
    <div>Logging out, please wait...</div>
  `,
})
export class NbLogoutComponent implements OnInit {

  redirectDelay: number = 1500;

  constructor(protected service: NbAuthService,
              private authenticationService: AuthenticationService,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }
}
