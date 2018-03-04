import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../../_shared/models/cart';
import { CartService } from '../../../_shared/services/cart.service';
import { flattenObject } from '../requests/flattenObject';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationService } from '../../../_shared/services/notification.service';


declare var require: any;
@Component({
  selector: 'app-requests-class',
  templateUrl: './requests-class.component.html',
  styleUrls: ['./requests-class.component.scss']
})
export class RequestsClassComponent implements OnInit {

  // Config for the table
  settings= {
    columns: {
      courseNo: {
        title: 'Course Number',
      },
      prefix: {
        title: 'Prefix',
      },
      title: {
        title: 'Title',
      },
    },
  };
  cart: Cart;
  source: LocalDataSource = new LocalDataSource();
  constructor(protected route: ActivatedRoute, private cartService: CartService,
    private notificationService: NotificationService, private router: Router) { }

  ngOnInit() {
    this.cartService.getById(this.route.snapshot.params['id']).subscribe((res: any) => {
      this.cart = res.data;
      const ob = this.cart.classes;
      const flatten = require('flat');
      const newOb = [];

      for (let i = 0; i < ob.length; i++) {
        if (ob !== null) {
          newOb.push(flatten(ob[i].class, { delimiter: '_' }, { maxDepth: 2 }));
        }
      }
      this.source.load(newOb);
    });
  }

  requestOnClick() {
    console.log("Not implemented yet");
  }

  approveOnClick() {
    this.notificationService.sendNotification(JSON.stringify({'message': 'Your Class Request has been approved!'}));
  }

}
