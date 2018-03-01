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
      test: {
        title: 'test',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    const cart = new Cart();
    cart._id = '1';
    cart.classes = [
      {
        _id: 'string',
        prerequisites: [  'CSCE145', 'CSCE146'],
        department: 'cs',
        curriculum: [['cs']],
        class: {
          title: 'string',
          courseNo: 'string',
          prefix: 'string',
        },
      },
    ];
    this.cartService.create(cart);
    console.log("Created Cart");
    /*this.cartService.getById('1')
    .subscribe((res: Cart[]) => {
      console.log(res);
      this.source.load(flattenObject(res));
    });*/
  }

}
