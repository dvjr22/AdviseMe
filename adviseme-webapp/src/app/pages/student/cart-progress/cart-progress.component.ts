import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../_shared/services/cart.service';
import { Cart } from '../../../_shared/models/cart';
import { User } from '../../../_shared/models/user';

@Component({
  selector: 'ngx-app-cart',
  templateUrl: './cart-progress.component.html',
  // styleUrls: ['./cart.component.scss'],
})
export class CartProgressComponent implements OnInit {
  currentUser: User;
  currentCart: Cart;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.cartService.getById(this.currentUser._id)
    .subscribe((res: any) => {
      this.currentCart = res.data;
    });
  }
}
