import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { ErrorService } from "../../Components/errors/error.service";


@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token : string;
    private userId: string;

    private authStatusListener = new Subject<boolean>();
    private userStatusListener = new Subject<boolean>();


    constructor(private http: HttpClient, private router : Router) {

    }

    getToken(){
      return this.token;
    }

    /*getisAdmin(){
      return this.isAdmin;
    }*/

    getisAuth(){
      return this.isAuthenticated;
    }

    getUserId() {
      return this.userId;
    }

    getAuthStatusListener(){
      return this.authStatusListener.asObservable();
    }

    /*getUserStatusListener(){
      return this.userStatusListener.asObservable();
    }*/

    signup(email: string, password: string){
      const authData: AuthData = { email: email, password: password};
         return this.http.post('https://benfood.herokuapp.com/user/signup', authData)
            .subscribe(() => {
        this.router.navigate(["/"]);
      }, error => {
        this.authStatusListener.next(false);
      });

    }

    signin(email : string, password : string) {
      const authData: AuthData = {email: email, password: password}
      return this.http.post<{ token : string }>('https://benfood.herokuapp.com/user/signin', authData)
          .subscribe(response => {
            const token = response.token;

            this.token = token;

            if(token){
              this.isAuthenticated = true;

              this.authStatusListener.next(true);

              localStorage.setItem('role', response['role']);
              localStorage.setItem('token', response['token']);

              this.router.navigate(['/']);
            }
          }, error => {});
    }

    /*getUsers(){
      return this.http.get('http://localhost:3000/getUser').map(
        result => this.result = result.json().data
      );
    }*/

    logout() {
       this.token = null;
       this.isAuthenticated = false;
       this.authStatusListener.next(false);
       this.router.navigate(['/']);
    }

}
