import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../../_shared/models/cart';
import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';
import { CartService } from '../../../_shared/services/cart.service';
import { flattenObject } from '../../../_shared/scripts/flattenObject';
import { Router, NavigationEnd } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

@Component({
  selector: 'ngx-app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  description = `View classes that have been added to the cart. Make any last
                minute edits before submitting to your advisor for approval.`;

  currentCart: Cart;
  currentUser: User;
  advisorID: string;
  noClasses = false;
  message = '';

  currentState = 'yesCart';


  // configuration for the table
  settings= {
    mode: 'inline',
    actions: {
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      class__title: {
        title: 'Title',
      },
      class__courseNo: {
        title: 'Course Number',
      },
      class__prefix: {
        title: 'Prefix',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private cartService: CartService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.loadData();
  }

  /**
    Triggered when the send to advisor button is clicked. Marks the advisor field
    with the advisors name which is how we are "sending" the cart
    @return {none}
  */
  submitToAdvisor() {
    this.userService.getCurrentUser().subscribe( res => {
      this.advisorID = res['advisor'];
      this.currentCart.advisor = this.advisorID;
      this.currentCart.status = 'pending';
      this.currentCart.requestDate = new Date().toString();
      this.currentCart.message = undefined;
      try {
        // Reload the data in the table, should be blank if the cart is sent
        this.loadData();
      } catch (e) {
        this.messageService.add({severity: 'error', summary: 'Cart Submit Failed', detail: 'Error submitting cart'});
      } finally {
        this.messageService.add({severity: 'success', summary: 'Cart Submit', detail: 'Successfully submitted your cart'});
        this.cartService.update(this.currentCart).subscribe(() => {
          this.router.navigate(['/pages/student/cart-progress']);
        });
      }
    });
  }

  /**
    Loads the cart data into the table
    @return {none}
  */
  loadData() {
     this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      // Get the current user to get the cart by the studentID
      this.cartService.getById(this.currentUser._id)
      .subscribe((res: any) => {
        this.currentCart = res.data;
        // If the advisor field is blank then show the cart.
        // Otherwise it has been sent to the advisor
        if (this.currentCart !== null) {
          if (this.currentCart.classes.length === 0) {
            this.noClasses = true;
          } else {
            if (this.currentCart.advisor === '' || this.currentCart.advisor === undefined) {
              this.source.load(flattenObject(this.currentCart.classes));
            } else {
              this.currentState = 'sentCart';
              if (this.currentCart.status === 'updated' || this.currentCart.status === 'rejected') {
                this.currentState = 'updatedCart';
                this.source.load(flattenObject(this.currentCart.classes));
              } else {
                this.source.load([]);
              }
            }
        }
        } else {
          this.currentState = 'noCart';
          this.source.load([]);
        }
        if (this.currentCart.message !== undefined) {
          this.message = this.currentCart.message;
        }
      });
  }

  /**
    Goes to the requested class page
  **/
  goToRequestClasses() {
    this.router.navigate(['pages/student/request-classes']);
  }

  /**
    Goes to the request progress page
  **/
  goToRequestProgress() {
    this.router.navigate(['/pages/student/cart-progress']);
  }

  /**

    @param {$event} event
    Deletes the class from the cart
  **/
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      const deletedItem = this.currentCart.classes.find(x => x._id === event.data.class__prefix + event.data.class__courseNo);
      const index = this.currentCart.classes.findIndex(d => d._id === event.data.class__prefix + event.data.class__courseNo);
      if (index >= 0) {

        this.currentCart.classes.splice(0, 1); // remove element from array
        this.cartService.update(this.currentCart).subscribe(() => {});
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    } else {
      event.confirm.reject();
    }
  }
}
