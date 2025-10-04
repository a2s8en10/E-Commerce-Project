import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMassage: string | undefined;

  constructor(private product: ProductService, private route: Router) { }

  // private product = inject(ProductService);

  ngOnInit(): void {
    this.product.CurrentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      });
      this.totalPrice = price + (price / 10) + (price / 8) + 100;
      console.log(this.totalPrice);


    });
  }

  orderNow(data: order) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItem(item.id)
        }, 900);
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMassage = "Your Order has been Placed"
          setTimeout(() => {
            this.route.navigate(['/myorder'])
            this.orderMassage = undefined;
          }, 3000);
        }
      })
    }

  }
}
