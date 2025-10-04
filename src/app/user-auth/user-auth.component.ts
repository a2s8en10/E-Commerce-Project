import { Component } from '@angular/core';
import { cart, Login, product, Signup } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  show = false;
  authError: string = "";

  constructor(private user: UserService, private product: ProductService) { }

  ngOnInit() {
    this.user.userAuthRefresh();
  }

  // form
  showSignUp() {
    this.show = false;
  }
  // form
  showLogin() {
    this.show = true;
  }

  // Api
  signUp(data: Signup) {
    console.log(data);
    this.user.userSignUp(data);
  }

  // Api
  Login(data: Login) {
    console.log(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      console.log(result);
      if (result) {
        this.authError = "Please Enter The Correct Details"
      }
      else {
        this.localcartToRemoteCart();
      }
    })
  }

  localcartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("Item Stored In DB");
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      })
    }

    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);



  }
}
