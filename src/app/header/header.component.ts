import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private route: Router, private product: ProductService) {}
  menuType: string = '';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName: string = '';
  cartItems = 0;

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.log('In seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.product.getCartList(userData.id);
        } else {
          // console.log('Outside seller');
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem("localCart");
    if(cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cart.subscribe((result)=>{
      this.cartItems = result.length;
    })
  }

  Logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['']);
    this.product.cart.emit([]);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  // search suggested
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        // console.log(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/', id]);
  }

  searchSubmit(val: string) {
    // console.log(val);
    this.route.navigate([`search/${val}`]);
  }
}
