import { Component, ViewChild, NgModule, OnInit, Input, SimpleChange,
  OnChanges, AfterViewChecked, ChangeDetectorRef, AfterViewInit, AfterContentChecked  } from '@angular/core';
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
    @Input() selectedClasses: any[] = [];

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
      private cdr: ChangeDetectorRef) {
    }

    /**
      Triggers when a checkbox is selected
      @returns {none}
    */
    onUserRowSelect(event) {
      console.log(event.selected);
      for (let i = 0; i < event.selected.length; i++) {
        console.log(event.selected[i]);
        if (!this.selectedClasses.includes(event.selected[i])) {
          this.selectedClasses.push(event.selected[i])
        }
      }
      //this.selectedClasses = event.selected;
      this.selectedClasses.concat(event.selected);
      console.log(this.selectedClasses);
      this.syncTable();
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
                this.cartService.update(this.cart);
              });
            }
        } catch (e) {
          this.messageService.add({severity: 'error', summary: 'Error adding to Cart',
            detail: 'An error has occured added those classes to your cart'});

        } finally {
          this.messageService.add({severity: 'success', summary: 'Added to Cart', detail: 'Classes were successfully added to your cart'});
        }
      } else {
        // No classes were selected
        this.messageService.add({severity: 'warn', summary: 'No Classes Selected', detail: 'Please select a class to add to your cart'});
      }
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
        this.classService.getClasses()
          .subscribe((res: Class[]) => {
            this.source.load(flattenObject(res));
        //    this.syncTable();
          });
        user = res;
        this.cartService.getById(user.studentID).subscribe((res2: any) => {
          this.cart = res2;
          const flatClasses = flattenObject(res2.data.classes);
          this.selectedClasses = flatClasses;
          //this.source.refresh();
        //  this.syncTable();
          if (this.cart._id === undefined) {
            this.cart._id = user.studentID;
          }
        });
      });
    }
    /*ngAfterViewInit() {
      this.syncTable();
    }*/
  //  timer = 100
    /* ngAfterViewChecked(): void {
       this.syncTable();
     }*/

    ngAfterContentChecked(): void {
      this.syncTable();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
      console.log("Change is occuring");
      for (let propName in changes) {
        console.log(propName);
      }
    }

    syncTable(): void {
      console.log("Syncing Table");
      console.log(this.selectedClasses);
      if (this.table.grid !== undefined) {
        this.table.grid.getRows().forEach((row) => {
          if (this.selectedClasses.find( r => r._id === row.getData()._id)) {
            row.isSelected = true;
            console.log('setting')
          }
        });
        this.cdr.detectChanges();

      }
      //console.log(this.table.grid.getRows().find( r => r.getData()._id === 'MATH141'));
    }
}
