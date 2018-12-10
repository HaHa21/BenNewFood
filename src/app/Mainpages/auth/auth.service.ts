import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
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
    private role : string;
    private userId: string;
    private authStatusListener = new Subject<boolean>();
    private userStatusListener = new Subject<boolean>();

    private helper = new JwtHelperService();

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

    getRole(){
      return this.role;
    }

    getAuthStatusListener(){
      return this.authStatusListener.asObservable();
    }

    /*getUserStatusListener(){
      return this.userStatusListener.asObservable();
    }*/

    signup(email: string, password: string){
      const authData: AuthData = { email: email, password: password};
         return this.http.post('/api/user/signup', authData)
            .subscribe(() => {
        this.router.navigate(["/"]);
      }, error => {
        this.authStatusListener.next(false);
      });

    }

    signin(email : string, password : string) {
      const authData: AuthData = {email: email, password: password}
      return this.http.post<{ role : string, token : string, userId: string}>('/api/user/signin', authData)
          .subscribe(response => {
            const token = response.token;
            //const role = response.role;

            this.token = token;


            if(token){
              this.isAuthenticated = true;
              this.userId = response.userId;
              console.log(response);

              this.authStatusListener.next(true);
    const decodedToken = this.helper.decodeToken(token);
              localStorage.setItem('role', decodedToken['role']);
              localStorage.setItem('token', response['token']);
              localStorage.setItem("userId", this.userId);

              this.role = localStorage.getItem('role');
              console.log(this.role);
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
