
import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

/**
  Component:
    For base pages layout mainly for naviagation menu
*/
@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  /**
    Navigation bar menu
  */
  menu = MENU_ITEMS;
}
