import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';


@Component({
  template: `<div [innerHtml]="html"></div>`,
})
export class ClassViewRenderComponent implements OnInit {

  public renderValue;
  html: any;

  @Input() value;

  constructor(private sanitizer: DomSanitizer) {  }

  ngOnInit() {
    this.renderValue = this.value;
    this.html = this.sanitizer.bypassSecurityTrustHtml(`
      <div class="btn-group btn-group-full-width" role="group">
            <button type="button" class="btn btn-primary btn-group-icon btn-group-divider btn-fixed">
              <i class="ion-information-circled"></i>
            </button>
            <button type="button" class="btn btn-primary">${this.renderValue}</button>
    </div>
    `);
  }

  example() {

  }


}
