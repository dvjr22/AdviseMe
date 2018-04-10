import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../_shared/services/cart.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'ngx-cart-reset',
  templateUrl: './cart-reset.component.html',
  styleUrls: ['./cart-reset.component.scss'],
})
export class CartResetComponent implements OnInit {
  resetCheck = false;
  constructor(private cartService: CartService, private messageService: MessageService) { }

  ngOnInit() {
  }


  resetAll(event) {
    this.cartService.deleteAll().subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Carts deleted', detail: 'Successfully deleted all the carts'});
    });
    this.resetCheck = false;
  }
}
