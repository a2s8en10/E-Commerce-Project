import { Component, inject, Inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {

  orderData: order[] | undefined;
  private product = inject(ProductService);

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe(() => {
      this.getOrderList();
    })
  }

  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    }
    )
  }



}
