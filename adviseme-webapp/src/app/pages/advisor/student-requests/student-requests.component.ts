import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../../_shared/models/cart';
import { CartService } from '../../../_shared/services/cart.service';
import { flattenObject, flattenClassesInCart } from './flattenObject';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationService } from '../../../_shared/services/notification.service';
import { MessageService } from 'primeng/components/common/messageservice';


declare var require: any;
@Component({
  selector: 'ngx-app-requests-class',
  templateUrl: './student-requests.component.html',
  styleUrls: ['./student-requests.component.scss'],
})
export class StudentRequestComponent implements OnInit {

  // Config for the table
  settings= {
    actions: false,
    columns: {
      class_prefix: {
        title: 'Prefix',
      },
      class_courseNo: {
        title: 'Course Number',
      },
      class_title: {
        title: 'Title',
      },
    },
  };

  cart: Cart;
  source: LocalDataSource = new LocalDataSource();
  comment: string;
  requestButtonStatus = true;

  constructor(protected route: ActivatedRoute, private cartService: CartService,
    private notificationService: NotificationService, private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this.cartService.getById(this.route.snapshot.params['id']).subscribe((res: any) => {
      // Get the cart data and flatten it, then load into the table
      this.cart = res.data;
      console.log(res);
      const ob = this.cart.classes;
      console.log(ob)
      let newOb = flattenObject(ob);
      console.log(newOb);
      this.source.load(newOb);
    });
  }

  /**
    Triggers on the Reqeust Changes button
    @returns {none}
  */
  requestOnClick() {
    // Send an SMS notification
    // this.notificationService.sendNotification(
    //   JSON.stringify(
    //     {'Your advisor has requested changes to your Class Request. \
    //     Please see the attached comment for details. ---' + this.comment},
    //   ));
    //   this.messageService.add({severity: 'info',
    //     summary: 'Changes Requested',
    //     detail: 'Successfully sent comments to student'});
    this.comment = '';
    // Navigate back to the request screen
    // this.router.navigate(['/pages/advisor/requests']);
    // Set the advisor field back to blank so that it will show up in the students profile
    this.cartService.getById(this.route.snapshot.params['id']).subscribe((res: any) => {
      this.cart = res.data;
      this.cart.advisor = '';
      this.cartService.update(this.cart);
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
  //  this.notificationService.sendNotification(JSON.stringify({'message': 'Your Class Request has been approved!'}));
    this.messageService.add({severity: 'success',
      summary: 'Successfully Approved Request',
      detail: 'The requested classes were succesfully approved'});
    // Navigate back to the requests screen
    // this.router.navigate(['/pages/advisor/requests']);
  }

  /**
    Triggers on the back button press
  */
  goBack() {
    // Navigate back to the requests screen
    this.router.navigate(['/pages/advisor/requests']);
  }
}
