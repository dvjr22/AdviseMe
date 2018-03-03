import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../../_shared/models/cart';
import { CartService } from '../../../_shared/services/cart.service';
import { flattenObject } from '../../cart/flattenObject';

@Component({
  selector: 'ngx-app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {

  // Config for the table
  settings= {
    columns: {
      title: {
        title: 'Title',
      },
      courseNo: {
        title: 'Course Number',
      },
      prefix: {
        title: 'Prefix',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.get()
    .subscribe((res) => {
      this.source.load(flattenObject(res.data.classes));
    });
  }

}
