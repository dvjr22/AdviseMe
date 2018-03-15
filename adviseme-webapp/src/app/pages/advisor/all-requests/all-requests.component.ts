import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../../_shared/models/cart';
import { CartService } from '../../../_shared/services/cart.service';
import { flattenObject } from './flattenObject';
import { CartViewRenderComponent } from '../../../_shared/services/cart-view.render.component';
import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

@Component({
  selector: 'ngx-app-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss'],
})
export class AllRequestsComponent implements OnInit {

  // Config for the table
  settings= {
    actions: false,
    columns: {
      _id: {
        title: 'Class Info',
        type: 'custom',
        filter: false,
        renderComponent: CartViewRenderComponent,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private cartService: CartService, private userService: UserService) { }

  ngOnInit() {
    this.cartService.getByAdvisor('advisor01')
      .subscribe( (res) => {
        this.source.load(flattenObject(res.data));
      });
    // this.cartService.get()
    //   .subscribe((res) => {
    //   this.source.load(flattenObject(res.data));
    // });
  }

}
