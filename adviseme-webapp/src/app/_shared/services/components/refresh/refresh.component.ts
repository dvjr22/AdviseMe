import { Component, Output,  EventEmitter} from '@angular/core';

/**
  Component:
    refresh-button
         This generates a small button that will emit nothing.
         The component that uses this should wait for the emit and refresh what's needed
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

  @Output() messageEvent = new EventEmitter<null>();


  constructor() {}

  /**
    Emits null
  **/
  refresh() {
    this.messageEvent.emit();
  }
}
