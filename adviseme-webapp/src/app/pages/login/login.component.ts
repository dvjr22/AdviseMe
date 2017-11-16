import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../_shared/services/authentication.service';
import { AlertService } from '../../_shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

   // If the user is already logged in then redirect to the dashboard
   if (this.authenticationService.checkForLocalUser()) {
     this.router.navigate(['/dashboard']);
   }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.loading = false;
          console.error('A login error has occured');
          this.alertService.error('Invalid password or username');
        });
  }

}
