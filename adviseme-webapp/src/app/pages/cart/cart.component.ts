import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../_shared/models/cart';
import { CartService } from '../../_shared/services/cart.service';
import { flattenObject } from './flattenObject';

@Component({
  selector: 'ngx-app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  // configuration for the table
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
    this.cartService.getById('1')
    .subscribe((res) => {
      this.source.load(flattenObject(res.data.classes));
    });
  }

}
