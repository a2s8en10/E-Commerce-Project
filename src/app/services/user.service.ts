import { EventEmitter, Injectable } from '@angular/core';
import { Login, Signup } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route: Router) {}

  userSignUp(user: Signup) {
    this.http
      .post('http://localhost:3000/User', user, { observe: 'response' })
      .subscribe((result) => {
        console.log(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.route.navigate(['/']);
        }
      });
  }

  userLogin(data: Login) {
    this.http
      .get<Signup[]>(
        `http://localhost:3000/User?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result && result.body && result.body.length) {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.route.navigate(['/']);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }

  userAuthRefresh() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['/']);
    }
  }
}
