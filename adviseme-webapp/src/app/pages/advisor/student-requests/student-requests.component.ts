import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../../_shared/models/cart';
import { CartService } from '../../../_shared/services/cart.service';
import { flattenObject, flattenClassesInCart } from '../../../_shared/scripts/flattenObject';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationService } from '../../../_shared/services/notification.service';
import { MessageService } from 'primeng/components/common/messageservice';
import * as io from 'socket.io-client';

declare var require: any;
@Component({
  selector: 'ngx-app-requests-class',
  templateUrl: './student-requests.component.html',
  styleUrls: ['./student-requests.component.scss'],
})
export class StudentRequestComponent implements OnInit {
  // Connection to the socket server for realtime chat updates
  socket = io('http://localhost:4001');
  // Config for the table
  settings= {
    actions: false,
    columns: {
      class__prefix: {
        title: 'Prefix',
      },
      class__courseNo: {
        title: 'Course Number',
      },
      class__title: {
        title: 'Title',
      },
    },
  };

  cart: Cart;
  source: LocalDataSource = new LocalDataSource();
  comment: string;
  requestButtonStatus = true;
  message: string;

  constructor(protected route: ActivatedRoute, private cartService: CartService,
    private notificationService: NotificationService, private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this.cartService.getById(this.route.snapshot.params['id']).subscribe((res: any) => {
      // Get the cart data and flatten it, then load into the table
      this.cart = res.data;
      const ob = this.cart.classes;
      let newOb = flattenObject(ob);
      this.source.load(newOb);
      this.message = '';
    });
  }

  /**
    Triggers on the Reqeust Changes button
    @returns {none}
  */
  requestOnClick() {
    // Navigate back to the request screen
    // this.router.navigate(['/pages/advisor/requests']);
    // Set the advisor field back to blank so that it will show up in the students profile
    this.cartService.getById(this.route.snapshot.params['id']).subscribe((res: any) => {
      this.cart = res.data;
      this.cart.advisor = '';
      this.cart.message = this.comment;
      this.cart.status = "Changes Requested";
      this.socket.emit('cart-status', 'Your advisor has requested that you: ' + this.cart.message + 'Please login to AdviseMe and look at the request.');
      this.cartService.update(this.cart).subscribe(() => this.router.navigate(['/pages/advisor/requests']));
    });
  }

  /**
    Captures the input field text
    @returns {none}
  */
  onKey(event: any) {
    this.comment = event.target.value;
    if (this.comment.length > 0) {
      // If the length is greater than zero then enable to request button
      this.requestButtonStatus = false;
    }
  }

  /**
    Triggers on the approve button
    @returns {none}
  */
  approveOnClick() {
    // Send an SMS notification to the student
    this.messageService.add({severity: 'success',
      summary: 'Successfully Approved Request',
      detail: 'The requested classes were succesfully approved'});
    // Navigate back to the requests screen
    //
    this.cartService.getById(this.route.snapshot.params['id']).subscribe((res: any) => {
      this.cart = res.data;
      this.cart.status = 'approved';
      this.cartService.update(this.cart).subscribe();
      this.socket.emit('cart-status', 'Your requested classes have been approved!');
      this.router.navigate(['/pages/advisor/requests']);
    });
  }

  /**
    Triggers on the back button press
  */
  goBack() {
    // Navigate back to the requests screen
    this.router.navigate(['/pages/advisor/requests']);
  }
}
