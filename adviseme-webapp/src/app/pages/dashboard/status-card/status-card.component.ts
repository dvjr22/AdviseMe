import { Component, Input } from '@angular/core';

/**
  Component:
    status-card
*/
@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="on = !on" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
  `,
})

/**
  Input type
*/
export class StatusCardComponent {
  /**
    Title for the card
  */
  @Input() title: string;
  /**
    Type of card
  */
  @Input() type: string;
  /**
    on 
  */
  @Input() on = true;
}
