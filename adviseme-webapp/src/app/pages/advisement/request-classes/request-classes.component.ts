import { Component, ViewChild, NgModule, OnInit, ChangeDetectorRef, AfterContentChecked  } from '@angular/core';
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
import { Ng2SmartTableComponent } from 'ng2-smart-table/ng2-smart-table.component';
import { Row } from 'ng2-smart-table/lib/data-set/row';
/**
  Complete course catalog
*/
@Component({
  selector: 'ngx-app-request-classes',
  templateUrl: './request-classes.component.html',
  styleUrls: ['./request-classes.component.scss'],
})

export class RequestClassesComponent implements OnInit, AfterContentChecked {

    // Class variables
    currentUser: User;
    cart: Cart;
    selectedClasses: any[] = [];
    @ViewChild('table') table: Ng2SmartTableComponent;

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
      private messageService: MessageService,
      private cdr: ChangeDetectorRef,
      private router: Router) {
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
        this.cartService.getById(user.studentID).subscribe((res2: any) => {
          if (res2.data !== null) {
            this.cart = res2.data
            const flatClasses = flattenObject(res2.data.classes);
            this.selectedClasses = flatClasses;
            if (this.cart._id === undefined) {
              this.cart._id = user.studentID;
            }
          } else {
            // Create the cart
            const newCart: Cart = new Cart();
            newCart._id = user.studentID;
            this.cartService.create(newCart);
            this.cart = newCart;
          }
        //  this.selectedClasses = this.cart.classes;
        });
      });
      this.classService.getClasses()
        .subscribe((res2: Class[]) => {
          this.source.load(flattenObject(res2));
      });
    }

    /**
      Triggers when a checkbox is selected
      @returns {none}
    */
    onUserRowSelect(event) {
        const index = this.selectedClasses.findIndex( s => s._id === event.data._id);
        if (index === -1) {
          this.selectedClasses.push(event.data);
        }else {
          this.selectedClasses.splice(index, 1);
        }
    }

    /**
      Triggers when the Add to cart button is clicked
      @returns {none}
    */
    addToCart(event) {
      // Make sure a class was selected
      if (this.selectedClasses !== undefined) {
        try {
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
                if (this.selectedClasses.length < this.cart.classes.length) {
                  for (let i2 = this.selectedClasses.length; i2 < this.cart.classes.length; i2++) {
                    this.cart.classes.splice(i2, 1);
                  }
                }
                this.cartService.update(this.cart);
              });
            }
        } catch (e) {
          this.messageService.add({severity: 'error', summary: 'Error adding to Cart',
            detail: 'An error has occured added those classes to your cart'});

        } finally {
          this.messageService.add({severity: 'success', summary: 'Added to Cart', detail: 'Classes were successfully added to your cart'});
          this.router.navigate(['/pages/cart']);
        }
      } else {
        // No classes were selected
        this.messageService.add({severity: 'warn', summary: 'No Classes Selected', detail: 'Please select a class to add to your cart'});
      }
    }

    /**
     Setting the checkboxes when the content has changed
     */
    ngAfterContentChecked(): void {
      this.syncTable();
    }

    /**
     Syncing the table selected rows with the selectedClasses list
     @returns {none}
     */
    syncTable(): void {
      if (this.table.grid !== undefined) {
        this.table.grid.getRows().forEach((row) => {
          if (this.selectedClasses.find( r => r._id === row.getData()._id)) {
            row.isSelected = true;
          }
        });
        this.cdr.detectChanges();
      }
    }
}
