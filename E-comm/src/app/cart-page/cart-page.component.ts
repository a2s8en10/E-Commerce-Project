import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadDetail();
  }

  loadDetail() {
    this.product.CurrentCart().subscribe((result) => {
      console.log(result);
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      });
      console.log(price);
      this.priceSummary.price = price;
      this.priceSummary.delivery = 100;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 8;
      // this.priceSummary.total = this.priceSummary.price + this.priceSummary.delivery + this.priceSummary.discount + this.priceSummary.tax;
      this.priceSummary.total = price + (price / 10) + (price / 8) + 100;
      console.log(this.priceSummary);

      if (this.cartData.length === 0) {
        this.router.navigate(['/']);
      }
    });
  }

  RemoveTocart(cartId: number | undefined) {
    cartId && this.product.removeToCart(cartId)
      .subscribe((result) => {
        this.loadDetail();
      })
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }
}
