import { Component, OnInit } from '@angular/core';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

/**
  Component:
    Allows a user to look at an overview of their class
*/
@Component({
  selector: 'ngx-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.scss'],
})
export class ClassViewComponent implements OnInit {
  /**
    Initializes new names for the imports
  */
  constructor() {
  }

  /**
    Gets the currents users id from the local cache then uses the user service
    to get the users information
  */
  ngOnInit() {
  }
}
