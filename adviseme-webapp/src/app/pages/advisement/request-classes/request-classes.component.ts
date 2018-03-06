import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';
import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';
import { Cart } from '../../../_shared/models/cart';
import { CartService } from '../../../_shared/services/cart.service';
import { ClassViewRenderComponent } from '../../../_shared/services/class-view.render.component';
import { flattenObject } from './flattenObject';
import { MessageService } from 'primeng/components/common/messageservice';


/**
  Complete course catalog
*/
@Component({
  selector: 'ngx-app-request-classes',
  templateUrl: './request-classes.component.html',
  styleUrls: ['./request-classes.component.scss'],
})

export class RequestClassesComponent implements OnInit {

    // Class variables
    currentUser: User;
    cart: Cart;
    selectedClasses;

    /**
      Configuration for the table
    */
    settings = {
      selectMode: 'multi',
      actions: false,
      columns: {
        class__prefix: {
          title: 'Department',
        },
        class__courseNo: {
          title: 'Course Number',
        },
        class__title: {
          title: 'Course Title',
        },
        _id: {
          title: 'Class Info',
          type: 'custom',
          filter: false,
          renderComponent: ClassViewRenderComponent,
        },
      },
    };



    /**
      The data that will go into the table
    */
    source: LocalDataSource = new LocalDataSource();

    /**
      Initializes new names for the imports
    */
    constructor(private classService: ClassService,
      private cartService: CartService,
      private userService: UserService,
      private messageService: MessageService) {
    }

    /**
      Triggers when a checkbox is selected
      @returns {none}
    */
    onUserRowSelect(event) {
      this.selectedClasses = event.selected;
    }

    /**
      Triggers when the Add to cart button is clicked
      @returns {none}
    */
    addToCart(event) {
      // HACK: Redo all of this shit after beta
      for (let i = 0; i < this.selectedClasses.length; i++) {
        // For each of the selected classes get the course information and set it to the cart.
        // Then update the cart model. This overwrites insead of updates it currently.
        this.classService.getClass(this.selectedClasses[i]._id).subscribe((res: any) => {
            if (this.cart.classes === undefined) {
              this.cart.classes = [res];
            } else {
              this.cart.classes[i] = res;
            }
            this.cartService.update(this.cart);
          });
        }
        this.messageService.add({severity: 'success', summary: 'Added to Cart', detail: 'Classes were successfully added to your cart'});
    }
    /**
        Gets all the classes flattens the object to add to the table
        @returns {none}
    */
    ngOnInit() {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      let user: User;
      // Get the current user model then get the cart by the associated studentID
      this.userService.getById(this.currentUser._id).subscribe((res: User) => {
        user = res;
        this.cartService.getById(user.studentID).subscribe((res2: Cart) => {
          this.cart = res2;
          if (this.cart._id === undefined) {
            this.cart._id = user.studentID;
          }
        });
      });
      this.classService.getClasses()
        .subscribe((res: Class[]) => {
          this.source.load(flattenObject(res));
        });
    }
}
