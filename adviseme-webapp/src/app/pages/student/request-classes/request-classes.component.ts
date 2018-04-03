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
import { flattenObject } from '../../../_shared/scripts/flattenObject';
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
    description = `Search classes by department, course number, and/or course title. Select
                   them by clicking on the check box and then add them to your cart. Once your
                   class selections are complete, navigate to the Cart for submission.`;

    // Class variables
    currentUser: User;
    cart: Cart;
    selectedClasses: any[] = [];
    OGClasses = [];
    @ViewChild('table') table: Ng2SmartTableComponent;
    buttonDisabled = true;

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
      this.userService.getCurrentUser().subscribe((res: User) => {
        user = res;

        this.cartService.getById(user._id).subscribe((res2: any) => {
          if (res2.data !== null) {
            this.cart = res2.data;
            const flatClasses = flattenObject(res2.data.classes);
            this.selectedClasses = flatClasses;

            flatClasses.forEach((x) => {
              this.OGClasses.push(Object.assign({}, x));
            });

            if (this.cart._id === undefined) {
              this.cart._id = user._id;
            }
          } else {
            // Create the cart
            const newCart: Cart = new Cart();
            newCart._id = user._id;
            newCart.studentID = user.studentID;
            newCart.status = 'created';
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

        let difference = false;

        this.selectedClasses.forEach(function (valueSC) {
          this.OGClasses.forEach(function (valueOG) {
            if (valueOG._id !== valueSC._id && difference !== true) {
              difference = true;
            } else if (difference === true) {
              difference = true;
            }else {
              difference = false;
            }
          });
        }, this);

        if (this.selectedClasses.length === 0 && this.OGClasses.length !== 0 || this.selectedClasses.length !== 0 && this.OGClasses.length === 0 ) {
          difference = true;
        }

        if (difference) {
          this.buttonDisabled = false;
        } else {
          this.buttonDisabled = true;
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
          // HACK: 3/28/2018 - Tyler Moon - I want to appologyize for this code. It is
          // some wacky stuff for sure. However, it works :)
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
                this.cartService.update(this.cart).subscribe(() => {
                  if (i === this.selectedClasses.length - 1) {
                    this.router.navigate(['/pages/cart']);
                  }
                });
              });
            }


        } catch (e) {
          this.messageService.add({severity: 'error', summary: 'Error adding to Cart',
            detail: 'An error has occured added those classes to your cart'});

        } finally {
          this.messageService.add({severity: 'success', summary: 'Added to Cart', detail: 'Classes were successfully added to your cart'});
          // TODO: Found out why it isn't updating the cart quick enough to pull the classes
        }
      } else {
        // No classes were selected
        this.messageService.add({severity: 'warn', summary: 'No Classes Selected', detail: 'Please select a class to add to your cart'});
      }
    }

    updatedCart(event) {
      // Make sure a class was selected
      if (this.selectedClasses !== undefined) {
        try {
          // HACK: Redo all of this shit after beta
          // HACK: 3/28/2018 - Tyler Moon - I want to appologyize for this code. It is
          // some wacky stuff for sure. However, it works :)
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
                this.cart.status = 'updated';
                this.cartService.update(this.cart).subscribe(() => {
                  if (i === this.selectedClasses.length - 1) {
                    this.router.navigate(['/pages/cart']);
                  }
                });
              });
            }


        } catch (e) {
          this.messageService.add({severity: 'error', summary: 'Error updating Cart',
            detail: 'An error has occured updating those classes to your cart'});

        } finally {
          this.messageService.add({severity: 'success', summary: 'Update Cart', detail: 'Classes were successfully updated in your cart'});
          // TODO: Found out why it isn't updating the cart quick enough to pull the classes
        }
      } else {
        // No classes were selected
        this.messageService.add({severity: 'warn', summary: 'No Classes Selected', detail: 'Please select a class to update in your cart'});
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
        if (this.table.grid !== undefined ) {
          this.table.grid.getRows().forEach((row) => {
            if (this.selectedClasses.find( r => r._id === row.getData()._id)) {
              row.isSelected = true;
            }
          });
          this.cdr.detectChanges();
        }
    }
}
