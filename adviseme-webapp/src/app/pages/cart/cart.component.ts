import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../_shared/models/cart';
import { User } from '../../_shared/models/user';
import { UserService } from '../../_shared/services/user.service';
import { CartService } from '../../_shared/services/cart.service';
import { flattenObject } from './flattenObject';

@Component({
  selector: 'ngx-app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  currentCart: Cart;
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
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.cartService.getById(this.currentUser.studentID)
    .subscribe((res) => {
      this.currentCart = res.data;
      console.log(this.currentCart.advisor);
      if (this.currentCart.advisor === '') {
        this.source.load(flattenObject(this.currentCart.classes));
      }
    });
  }

  submitToAdvisor() {
    // TODO: Take out this hardcoded string
    this.currentCart.advisor = 'advisor01';
    this.cartService.update(this.currentCart);
  }

}
