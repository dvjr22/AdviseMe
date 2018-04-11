/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

import { AuthenticationService } from '../../../../../_shared/services/authentication.service';
import { AlertService } from '../../../../../_shared/services/alert.service';

import { NbAuthResult, NbAuthService } from '../../services/auth.service';

@Component({
  selector: 'nb-login',
  template: `
  <nb-card-body>
    <toaster-container></toaster-container>
  </nb-card-body>
  <nb-auth-block>
    <div style="width: 100%;">
      <img src="/assets/images/AdviseMeLogo.png" style="display:block; margin: auto; height: 100px; width: 100px;">
    </div>
    <br/>
    <h2 class="title">AdviseMe</h2>
    <small class="form-text sub-title">Hello! Sign in with your username</small>

    <form (ngSubmit)="login()" #form="ngForm" autocomplete="nope">

      <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
           class="alert alert-danger" role="alert">
        <div><strong>Oh snap!</strong></div>
        <div *ngFor="let error of errors">{{ error }}</div>
      </div>

      <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
           class="alert alert-success" role="alert">
        <div><strong>Hooray!</strong></div>
        <div *ngFor="let message of messages">{{ message }}</div>
      </div>

      <div class="form-group">
          <label for="input-username" class="sr-only">Email address</label>
          <input name="username" [(ngModel)]="user.username" id="input-username"
                 class="form-control" placeholder="Username" #username="ngModel"
                 [class.form-control-danger]="username.invalid && username.touched" autofocus
                 [required]="getConfigValue('forms.validation.username.required')"
                 [minlength]="getConfigValue('forms.validation.username.minLength')"
                 [maxlength]="getConfigValue('forms.validation.username.maxLength')">
          <small class="form-text error" *ngIf="username.invalid && username.touched && username.errors?.required">
            Username is required!
          </small>
          <small class="form-text error"
                 *ngIf="username.invalid && username.touched && (username.errors?.minlength || username.errors?.maxlength)">
                 Username should contains
                 from {{ getConfigValue('forms.validation.password.minLength') }}
                 to {{ getConfigValue('forms.validation.password.maxLength') }}
                 characters
          </small>
        </div>

      <div class="form-group">
        <label for="input-password" class="sr-only">Password</label>
        <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
               class="form-control" placeholder="Password" #password="ngModel"
               [class.form-control-danger]="password.invalid && password.touched"
               [required]="getConfigValue('forms.validation.password.required')"
               [minlength]="getConfigValue('forms.validation.password.minLength')"
               [maxlength]="getConfigValue('forms.validation.password.maxLength')">
        <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required">
          Password is required!
        </small>
        <small
          class="form-text error"
          *ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">
          Password should contains
          from {{ getConfigValue('forms.validation.password.minLength') }}
          to {{ getConfigValue('forms.validation.password.maxLength') }}
          characters
        </small>
      </div>

      <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
              [class.btn-pulse]="submitted">
        Sign In
      </button>
    </form>

    <div class="links">
      <!--<small class="form-text">Or connect with:</small>

      <div class="socials">
        <a href="https://github.com/SCCapstone/AdviseMe" target="_blank" class="socicon-github"></a>
        <a href="https://www.facebook.com/" target="_blank" class="socicon-facebook"></a>
        <a href="https://twitter.com" target="_blank" class="socicon-twitter"></a>
      </div>-->

    </div>
    <br/>
    <br/>
    <br/>
    <br/>
  </nb-auth-block>
  `,
})
export class NbLoginComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  loading = false;
  returnUrl: string;

  constructor(protected service: NbAuthService,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(
        data => {
          this.router.navigate(['pages/dashboard']);
        },
        error => {
          this.loading = false;
          console.error('A login error has occured');
          this.alertService.error('Invalid Username or Password');
        });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
