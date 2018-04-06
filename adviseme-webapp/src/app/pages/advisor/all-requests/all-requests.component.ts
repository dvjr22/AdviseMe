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

  description = `Provides a list of all pending student class requests. Select
                 one to view the classes a student is requesting. Approve the
                 request, or provide feedback for the student to make changes.`;

  advisorID: string;
  noRequest: boolean;

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
        for (let i = flatData.length - 1; i >= 0; i--) {
          const d = flatData[i];
          if (d.status !== 'approved') {
            this.userService.getById(d._id).subscribe((userres) => {
              d.fullName = userres.firstName + ' ' + userres.lastName;
              flatData[i] = d;
            });
          } else {
            const index = flatData.indexOf(d, 0);
            if (index > -1) {
               flatData.splice(index, 1);
            }
          }
        }
        if (flatData.length !== 0) {
          this.noRequest = false;
          this.source.load(flatData);
        } else {
          this.noRequest = true;
        }
      });
  }
  receiveSource($event) {
    this.loadData();
  }

}
