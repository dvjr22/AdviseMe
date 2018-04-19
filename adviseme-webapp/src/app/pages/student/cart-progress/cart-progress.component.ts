import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CartService } from '../../../_shared/services/cart.service';
import { UserService } from '../../../_shared/services/user.service';
import { CacheService, CacheKeys } from '../../../_shared/services/cache.service';
import { Cart } from '../../../_shared/models/cart';
import { User } from '../../../_shared/models/user';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { flattenObject } from '../../../_shared/scripts/flattenObject';


@Component({
  selector: 'ngx-app-cart',
  templateUrl: './cart-progress.component.html',
  styleUrls: ['./cart-progress.component.scss'],
})
export class CartProgressComponent implements OnInit {

  description = `View when your class request has been accepted, or if it has been sent back with feedback or suggestions`;

  currentUser: User;
  currentCart: Cart;

  advisorName: string;
  advisorEmail: string;

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
              private userService: UserService,
              private messageService: MessageService,
              private router: Router,
              private cacheService: CacheService) { }

  ngOnInit() {
    this.loadData();
  }

  receiveSource($event) {
    this.loadData();
  }

  /**
    Loads the data to the table
  **/
  loadData() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.cacheService.get(CacheKeys.cart, this.cartService.getById(this.currentUser._id))
    .subscribe((res: any) => {
      this.currentCart = res.data;

      if (this.currentCart !== null) {
        this.source.load(flattenObject(this.currentCart.classes));
      } else {
        this.source.load([]);
      }
    });
    this.cacheService.get(CacheKeys.currentUser, this.userService.getCurrentUser())
    .subscribe((res) => {
      this.userService.getById(res.advisor).subscribe((response) => {
        this.advisorName = response.firstName + ' ' + response.lastName;
        this.advisorEmail = response.email;
      });
    });
  }
  /**
    Routes to the cart screen
  **/
  cancelRequest() {
    try {
      this.currentCart.status = 'created';
      this.currentCart.advisor = '';
    } catch (e) {
      this.messageService.add({severity: 'error', summary: 'Cancel Request Failed', detail: 'Error cancelling your request'});
    } finally {
      this.messageService.add({severity: 'success', summary: 'Cancelled Request', detail: 'Successfully cancelled your request'});
      this.cartService.update(this.currentCart).subscribe(() => {
        this.router.navigate(['/pages/student/cart']);
      });
    }
  }

  goToCart() {
    this.router.navigate(['pages/student/cart']);
  }
}
