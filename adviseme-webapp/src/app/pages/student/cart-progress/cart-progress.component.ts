import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CartService } from '../../../_shared/services/cart.service';
import { Cart } from '../../../_shared/models/cart';
import { User } from '../../../_shared/models/user';
import { Router } from '@angular/router';

import { flattenObject } from '../../../_shared/scripts/flattenObject';


@Component({
  selector: 'ngx-app-cart',
  templateUrl: './cart-progress.component.html',
  // styleUrls: ['./cart.component.scss'],
})
export class CartProgressComponent implements OnInit {
  currentUser: User;
  currentCart: Cart;

  // configuration for the table
  settings= {
    mode: 'inline',
    actions: false,
    columns: {
      class__title: {
        title: 'Title',
        filter: false,
      },
      class__courseNo: {
        title: 'Course Number',
        filter: false,
      },
      class__prefix: {
        title: 'Prefix',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private cartService: CartService,
              private router: Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.cartService.getById(this.currentUser._id)
    .subscribe((res: any) => {
      this.currentCart = res.data;

      if (this.currentCart !== null) {
        if (this.currentCart.advisor !== '' || this.currentCart.advisor === undefined) {
          this.source.load(flattenObject(this.currentCart.classes));
        } else {
          this.source.load([]);
        }
      } else {
        this.source.load([]);
      }
    });
  }

  goToCart() {
    this.router.navigate(['pages/cart']);
  }
}
