import { Component, ViewChild, NgModule, OnInit, ChangeDetectorRef, AfterContentChecked  } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Class } from '../../../../_shared/models/class';
import { ClassService } from '../../../../_shared/services/class.service';
import { User } from '../../../../_shared/models/user';
import { UserService } from '../../../../_shared/services/user.service';
import { Cart } from '../../../../_shared/models/cart';
import { CartService } from '../../../../_shared/services/cart.service';
import { CacheService } from '../../../../_shared/services/cache.service';
import { ClassViewRenderComponent } from '../../../../_shared/services/class-view.render.component';
import { flattenFiveObjects } from '../../../../_shared/scripts/flattenObject';
import { MessageService } from 'primeng/components/common/messageservice';
import { Ng2SmartTableComponent } from 'ng2-smart-table/ng2-smart-table.component';
import { Row } from 'ng2-smart-table/lib/data-set/row';

import { CapitalizePipe } from '../../../../@theme/pipes/capitalize.pipe';

/**
  Component:
    For the future classes that the user is in
*/
@Component({
  selector: 'ngx-future-classes',
  styleUrls: ['./future-classes.component.scss'],
  templateUrl: './future-classes.component.html',
})

export class FutureClassesComponent implements OnInit, AfterContentChecked {

      // Class variables
      currentUser: User;
      cart: Cart;
      classes: any[] = [];
      selectedClasses: any[] = [];
      recomendation: number;
      @ViewChild('table') table: Ng2SmartTableComponent;

      /**
        Configuration for the table
      */
      settings = {
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
        private cacheService: CacheService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef,
        private router: Router) {
      }

      /**
          Gets all the classes flattens the object to add to the table
          @returns {none}
      */
      ngOnInit() {
        // const current = this.cacheService.get('id1234', this.userService.bigOlTest());
        // current.subscribe(res => {console.log(res)});
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        let user: User;
        // Get the current user model then get the cart by the associated studentID

        const currentUserObservable = this.cacheService.get(this.currentUser._id + 'user', this.userService.getCurrentUser());
        console.log(currentUserObservable);
        if (currentUserObservable['value'] === undefined) {
          // There is no cached data so query the API
          currentUserObservable.subscribe((res: User) => {
            user = res;
            const cartObservable = this.cacheService.get(user._id + 'cart', this.cartService.getById(user._id));
            const cir = res.course;
            this.recomendation = 0;
            const data = [];
            for (const c of cir) {
              if (c.grade === 'tbc' && this.recomendation < 5) {
                this.classes.push(c);
                this.classService.getClass(c.classID).subscribe((classRes) => {
                  data.push(classRes);
                  this.source.load(flattenFiveObjects(data));
                });
                this.recomendation ++;
              }
            }
            cartObservable.subscribe((res2: any) => {
              if (res2.data !== null) {
                this.cart = res2.data;
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
        } else {
          // There is a cache of the data
          user = currentUserObservable['value'];
          const cartObservable = this.cacheService.get(user._id + 'cart', this.cartService.getById(user._id));
          const cir = user.course;
          this.recomendation = 0;
          const data = [];
          for (const c of cir) {
            if (c.grade === 'tbc' && this.recomendation < 5) {
              this.classes.push(c);
              this.classService.getClass(c.classID).subscribe((classRes) => {
                data.push(classRes);
                this.source.load(flattenFiveObjects(data));
              });
              this.recomendation ++;
            }
          }
          cartObservable.subscribe((res2: any) => {
            if (res2.data !== null) {
              this.cart = res2.data;
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
        }

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
        if (this.classes !== undefined) {
          try {
            // HACK: Redo all of this shit after beta
            // HACK: 3/28/2018 - Tyler Moon - I want to appologyize for this code. It is
            // some wacky stuff for sure. However, it works :)
            for (let i = 0; i < this.classes.length; i++) {
              // For each of the selected classes get the course information and set it to the cart.
              // Then update the cart model. This overwrites insead of updates it currently.
              this.classService.getClass(this.classes[i].classID).subscribe((res: any) => {
                  if (this.cart.classes === undefined) {
                    this.cart.classes = [res];
                  } else {
                    this.cart.classes[i] = res;
                  }
                  if (this.classes.length < this.cart.classes.length) {
                    for (let i2 = this.classes.length; i2 < this.cart.classes.length; i2++) {
                      this.cart.classes.splice(i2, 1);
                    }
                  }
                  this.cartService.update(this.cart).subscribe(() => {
                    if (i === this.classes.length - 1) {
                      this.router.navigate(['/pages/student/cart']);
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

          if (this.table !== undefined && this.table.grid !== undefined) {
            this.table.grid.getRows().forEach((row) => {
              if (this.selectedClasses.find( r => r._id === row.getData()._id)) {
                row.isSelected = true;
              }
            });
            this.cdr.detectChanges();
          }
      }

      goToClasses(event) {
        this.router.navigate(['/pages/student/request-classes']);
      }
}
