import { Component } from '@angular/core';

/**
  Component:
    refresh-button
*/
@Component({
  selector: 'ngx-refresh-button',
  styleUrls: ['./refresh.component.scss'],
  template: `
  <div class="btn-group btn-group-full-width" role="group">
      <button  (click)="refresh()" type="button" class="btn btn-info btn-group-icon btn-group-divider btn-fixed">
        <i class="ion-refresh"></i>
      </button>
  </div>
  `,
})

export class RefreshButtonComponent {

  refresh() {
    window.location.reload(true);
  }
}
