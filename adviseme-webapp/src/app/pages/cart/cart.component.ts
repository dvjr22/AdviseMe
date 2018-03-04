import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../_shared/models/cart';
import { User } from '../../_shared/models/user';
import { UserService } from '../../_shared/services/user.service';
import { CartService } from '../../_shared/services/cart.service';
import { flattenObject } from './flattenObject';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  currentCart: Cart;
  currentUser: User;
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

  constructor(private cartService: CartService, private userService: UserService, private router: Router) { }
  ngOnInit() {
    this.loadData();
  }

  submitToAdvisor() {
    // TODO: Take out this hardcoded string
    this.currentCart.advisor = 'advisor01';
    console.log(this.currentCart);
    this.cartService.update(this.currentCart);
    this.loadData();
  }

  loadData() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id).subscribe((res) => {
      console.log(res);
      this.cartService.getById(res.studentID)
      .subscribe((res2: any) => {
        console.log(res2);
        this.currentCart = res2.data;
        console.log(this.currentCart.advisor);
        if (this.currentCart.advisor === '' || this.currentCart.advisor === undefined) {
          this.source.load(flattenObject(this.currentCart.classes));
        } else {
          this.source.load([]);
        }
      });
    });
  }
}
