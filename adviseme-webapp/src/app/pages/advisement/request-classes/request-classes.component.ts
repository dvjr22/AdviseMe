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

/**
  Complete course catalog
*/
@Component({
  selector: 'ngx-app-request-classes',
  templateUrl: './request-classes.component.html',
  styleUrls: ['./request-classes.component.scss'],
})

export class RequestClassesComponent implements OnInit {

    currentUser: User;
    cart: Cart;
    selectedClasses;
    userID;
    /**
      Configuration for the table
    */
    settings = {
      selectMode: 'multi',
      actions: false,
      columns: {
        class_prefix: {
          title: 'Department',
        },
        class_courseNo: {
          title: 'Course Number',
        },
        class_title: {
          title: 'Course Title',
        },
        _id: {
          title: 'Class Info',
          type: 'custom',
          filter: false,
          renderComponent: ClassViewRenderComponent,
        },
        // request: {
        //   title: 'Request',
        //   type: 'html',
        //   valuePrepareFunction:(cell,row)=>{
        //     return `<input id="checkBox" type="checkbox" checked>`
        //   },
        //   filter: false
        // },
      },
    };

    onUserRowSelect(event) {
      console.log('user row select: ', event.selected);
      console.log(this.cart);
      this.selectedClasses = event.selected;
      console.log(this.selectedClasses);
      console.log(this.cart._id);
      //this.selected = event.selected;
      //console.log('selected list: ', this.selected);
    };

    addToCart(event) {
      // HACK: Redo all of this shit after beta
      //this.cart = this.cartService.getById(this.currentUser.studentID).subscribe((res: Cart) => { res });
      console.log('car before unflatten: ' + JSON.stringify(this.selectedClasses));
      console.log(this.selectedClasses[0]._id)
      //this.cart.classes = this.selectedClasses
      for(var i = 0; i < this.selectedClasses.length; i++){
      this.classService.getClass(this.selectedClasses[i]._id).subscribe((res: any) => {
        console.log(res);
        if(this.cart.classes === undefined){
          this.cart.classes = [res];
        }else{
          this.cart.classes[i] = res;
        }
        this.cartService.update(this.cart);
        });
      }
      this.cartService.update(this.cart);
    }

    /**
      The data that will go into the table
    */
    source: LocalDataSource = new LocalDataSource();

    /**
      Initializes new names for the imports
    */
    constructor(private classService: ClassService, private cartService: CartService, private userService: UserService) {
    }

    /**
        Gets all the classes flattens the object to add to the table
        @returns {none}
    */
    ngOnInit() {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      let user: User;
      this.userService.getById(this.currentUser._id).subscribe((res: User) => { user = res; console.log(res);
        this.cartService.getById(user.studentID).subscribe((res: Cart) => {
          this.cart = res;
          if (this.cart._id === undefined) {
            this.cart._id = user.studentID;
            console.log("It worked wheee");
            console.log(user.studentID)
          }
        });});

      this.classService.getClasses()
        .subscribe((res: Class[]) => {
          this.source.load(flattenObject(res));
        });
    }
}
