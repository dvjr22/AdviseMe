import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signedIn = false;

  constructor(private authenticationService: AuthenticationService) { }

  // Check login permission when the component is initiated and whenever
  // the router is activated
  ngOnInit() {
    this.checkPermission();
  }

  // Call the authenticationService to see if a user is currently logged in
  checkPermission() {
    // Call the authenticationService to see if a user is currently logged in
    if (this.authenticationService.checkForLocalUser()) {
      // A user is logged in so change the signedIn flag which set the
      // ng-template to fullSite and renders the entire navigation.
      // Also the CanActivateUser will notice this and unlock the routes
      this.signedIn = true;
    } else {
      // A user is not logged in so only show the login and registration
      // nav bar. The router should re-route to the login page
      this.signedIn = false;
    }
  }

}
