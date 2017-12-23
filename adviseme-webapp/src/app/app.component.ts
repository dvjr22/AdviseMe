import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';

/**
  Component:
    For the main application
*/
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  /**
    Initializes new names for the imports
  */
  constructor(private analytics: AnalyticsService) {
  }
  /**
    Tracking page analytics
  */
  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
