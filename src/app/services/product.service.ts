import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }
  cart = new EventEmitter<product[] | []>();
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/product', data);
  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/product');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }

  getProducts(id: string) {
    return this.http.get<product>(`http://localhost:3000/product/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(
      `http://localhost:3000/product/${product.id}`,
      product
    );
    console.log(product);
  }

  topProducts() {
    return this.http.get<product[]>('http://localhost:3000/product?_limit=3');
  }

  topSellProduct() {
    return this.http.get<product[]>('http://localhost:3000/product?_limit=10');
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/product?q=${query}`);
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cart.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cart.emit(cartData);
  }

  removeItemFromCart(value: number) {
    let cartDetail = localStorage.getItem('localCart');
    if (cartDetail) {
      let items: product[] = JSON.parse(cartDetail);
      items = items.filter((item: product) => value !== item.id);
      console.log(items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cart.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/Cart', cartData);
  }
  getCartList(userId: number) {
    return this.http.get<product[]>('http://localhost:3000/Cart?userId=' + userId,
      { observe: 'response' }).subscribe((result) => {
        // console.log(result);
        if (result && result.body) {
          this.cart.emit(result.body);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/Cart/' + cartId);
  }

  CurrentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/Cart?userId=' + userData.id);
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/Order', data)
  }

  orderList() {
    let userStore = localStorage.getItem('user'); 
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/Order?userId=' + userData.id)

  }

  deleteCartItem(cartId: number) {
    return this.http.delete('http://localhost:3000/Cart/' + cartId, { observe: 'response' }).subscribe((result) => {
      if (result) {
        this.cart.emit([]);
      }
    })
  }

  cancelOrder(orderId: number) {
    return this.http.delete('http://localhost:3000/Order/' + orderId);
  }
}
