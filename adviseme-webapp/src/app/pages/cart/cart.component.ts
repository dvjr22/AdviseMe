import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../_shared/models/cart';
import { User } from '../../_shared/models/user';
import { UserService } from '../../_shared/services/user.service';
import { CartService } from '../../_shared/services/cart.service';
import { flattenObject } from '../../_shared/scripts/flattenObject';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'ngx-app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  currentCart: Cart;
  currentUser: User;
  advisorID: string;

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
    private messageService: MessageService) { }

  ngOnInit() {
    this.loadData();
  }

  /**
    Triggered when the send to advisor button is clicked. Marks the advisor field
    with the advisors name which is how we are "sending" the cart
    @return {none}
  */
  submitToAdvisor() {
    // TODO: Take out this hardcoded string
    // this.currentCart.advisor = 'advisor01';
    this.userService.getCurrentUser().subscribe( res => {
      this.advisorID = res['advisor'];
      console.log(this.advisorID);
      console.log(this.advisorID);
      this.currentCart.advisor = this.advisorID;
      this.currentCart.status = 'pending';
      // Update the cart
      this.cartService.update(this.currentCart);
      try {
        // Reload the data in the table, should be blank if the cart is sent
        this.loadData();
      } catch (e) {
        this.messageService.add({severity: 'error', summary: 'Cart Submit Failed', detail: 'Error submitting cart'});
      } finally {
        this.messageService.add({severity: 'success', summary: 'Cart Submit', detail: 'Successfully submitted your cart'});
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
          if (this.currentCart.advisor === '' || this.currentCart.advisor === undefined) {
            this.source.load(flattenObject(this.currentCart.classes));
          } else {
            this.currentState = 'sentCart';
            this.source.load([]);
          }
        } else {
          this.currentState = 'noCart';
          this.source.load([]);
        }
      });
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      const deletedItem = this.currentCart.classes.find(x => x._id === event.data.class__prefix + event.data.class__courseNo);
      const index = this.currentCart.classes.findIndex(d => d._id === event.data.class__prefix + event.data.class__courseNo);
      if (index <= 0) {
        this.currentCart.classes.splice(0, 1); // remove element from array
        this.cartService.update(this.currentCart);
        event.confirm.resolve();
      } else {
        //TODO: PUT ERROR MESSAGE HERE
        event.confirm.resolve();
      }
    } else {
      event.confirm.reject();
    }
  }
}
