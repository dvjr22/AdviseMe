import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../../_shared/models/cart';
import { CartService } from '../../../_shared/services/cart.service';
import { flattenObject } from '../../cart/flattenObject';
import { ClassViewRenderComponent } from '../../../_shared/services/class-view.render.component';

@Component({
  selector: 'ngx-app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {

  // Config for the table
  settings= {
    columns: {
      classes_0_class_prefix: {
        title: 'Course Number',
      },
      _id: {
        title: 'Class Info',
        type: 'custom',
        filter: false,
        renderComponent: ClassViewRenderComponent,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.get()
      .subscribe((res) => {
      console.log(res.data);
      this.source.load(flattenObject(res.data));
    });
  }

}
