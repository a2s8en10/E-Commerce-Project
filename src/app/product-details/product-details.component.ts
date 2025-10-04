import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { filter } from 'rxjs';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  showDetail: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) { }
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.log(value);
    productId &&
      this.product.getProducts(productId).subscribe((result) => {
        // console.log(result);
        this.showDetail = result;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let item = JSON.parse(cartData);
          item = item.filter((item: product) => productId == item.id.toString());
          if (item.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cart.subscribe((result) => {
            // let item = result.filter((item: product) => productId?.toString() === item.value?.toString());
            // if (item) {
            //   this.cartData = item[0];
            //   this.removeCart = true;
            // }else{
            //   this.removeCart = false;
            // }
            // result.filter((item: product) => productId?.toString() === item.productId?.toString());
            // if (result.length) {
            //   this.cartData = result[0];
            //   this.removeCart = true;
            // }
            let item = result.filter((item: product) => productId?.toString() === item.productId?.toString());
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          })
        }
      });
  }

  increase(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val == 'minus') {
      this.productQuantity -= 1;
    }
  }

  AddToCart() {
    if (this.showDetail) {
      this.showDetail.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        // console.log(this.showDetail);
        this.product.localAddToCart(this.showDetail);
        this.removeCart = true;
      }
      else {
        // console.log("User is logged in");  
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.log(userId);
        let cartData: cart = {
          ...this.showDetail,
          productId: this.showDetail.id,
          userId
        }
        delete cartData.id;
        // console.log(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            // alert("Item is added to cart");
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
    }
    else {
      console.log("CartData - ", this.cartData);

      this.cartData && this.product.removeToCart(this.cartData.id)
        .subscribe((result) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId)
        })
    }
    this.removeCart = false;
  }
}
