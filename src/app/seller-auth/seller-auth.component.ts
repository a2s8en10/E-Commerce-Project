import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, Signup } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  constructor(private seller: SellerService, private router: Router) {}

  showLogin=false;
  authError : string = ""

  ngOnInit():void {
    this.seller.reloadSeller()
  }

  signUp(data: Signup): void {
    this.seller.userSignUp(data)
  }

  Login(data: Login): void {
    // console.log(data);
    // this.authError = "";

    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((iserror)=>{
      if(iserror){
        this.authError ="Incorrect email or password. Please try again!";
      }
    })
  }

  openLogin(){
    this.showLogin = true;
  }
  openSignUp(){
    this.showLogin = false;
  }
}
