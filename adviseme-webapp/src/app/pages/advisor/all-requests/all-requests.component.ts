import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../../_shared/models/cart';
import { CartService } from '../../../_shared/services/cart.service';
import { flattenObject } from '../../../_shared/scripts/flattenObject';
import { CartViewRenderComponent } from '../../../_shared/services/cart-view.render.component';
import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

@Component({
  selector: 'ngx-app-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss'],
})
export class AllRequestsComponent implements OnInit {

  advisorID: string;

  // Config for the table
  settings= {
    actions: false,
    columns: {
      studentID: {
        title: 'Student ID',
      },
      fullName: {
        title: 'Student Name',
      },
      status: {
        title: 'Status',
      },
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
    this.loadData();
  }

  loadData() {
    const currentAdvisor = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userService.getCurrentUser().subscribe( res => {
      this.advisorID = res['advisor'];
    });

    this.cartService.getByAdvisor(currentAdvisor._id)
      .subscribe( (res) => {
        const flatData = flattenObject(res.data);
        for (let i = 0; i < flatData.length; i++) {
          const d = flatData[i];
          this.userService.getById(d._id).subscribe((userres) => {
            d.fullName = userres.firstName + ' ' + userres.lastName;
            flatData[i] = d;
          });
        }
        this.source.load(flatData);
      });
  }
  receiveSource($event) {
    this.loadData();
  }

}
