import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import  * as moment from 'moment-timezone';
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { ErrorService } from "../../Components/errors/error.service";


@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token : string;
    private tokenTimer: any;
    private role : string;
    private isAdmin = false;
    private userId: string;
    private authStatusListener = new Subject<boolean>();
    private adminStatusListener = new Subject<boolean>();
    private helper = new JwtHelperService();

    constructor(private http: HttpClient, private router : Router) {
       this.token = localStorage.getItem('token') || '';
       this.isAuthenticated = this.token ? true : false;
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

    getAdminRole(){
      return this.isAdmin;
    }

    getAuthStatusListener(){
      return this.authStatusListener.asObservable();
    }

    getAdminStatusListener(){
      return this.adminStatusListener.asObservable();
    }


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
      return this.http.post<{ role : string, token : string, expiresIn: number,  userId: string}>('/api/user/signin', authData)
          .subscribe(response => {
            const token = response.token;
            //const role = response.role;

            this.token = token;


            if(token){

              const expiresInDuration = response.expiresIn;
              this.setAuthTimer(expiresInDuration);
              this.isAuthenticated = true;
              this.isAdmin = true;
              this.userId = response.userId;
              console.log(response);

              this.authStatusListener.next(true);

           const decodedToken = this.helper.decodeToken(token);
              localStorage.setItem('role', response['role']);


              this.role = localStorage.getItem('role');
              if(this.role == "Admin"){
                this.adminStatusListener.next(true);
              } else {
                  this.adminStatusListener.next(false);
              }



              var currentDate = moment();
              const expirationDate = currentDate.tz('UTC').add(1, 'hours').format("YYYY Do MM T HH mm ss");


              this.saveAuthData(token, expirationDate, this.userId);
              this.router.navigate(['/']);
            }
          }, error => {});
    }

    /*getUsers(){
      return this.http.get('http://localhost:3000/getUser').map(
        result => this.result = result.json().data
      );
    }*/

      private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
      }

      autoAuthUser() {
          const authInformation = this.getAuthData();
          if (!authInformation) {
            return;
          }
          const now = new Date();
          const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
          if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
          }
      }

    logout() {
       this.token = null;
       this.isAuthenticated = false;
       this.authStatusListener.next(false);
       clearTimeout(this.tokenTimer);
          this.clearAuthData();
       this.router.navigate(['/']);
    }

    private saveAuthData(token: string, expirationDate: string, userId: string){
      localStorage.setItem("token", token);
      localStorage.setItem("expiration", expirationDate);
      localStorage.setItem("userId", userId);

    }

    private getAuthData() {
      const token = localStorage.getItem("token");
      const expirationDate = localStorage.getItem("expiration");
      const userId = localStorage.getItem("userId");

      if (!token || !expirationDate) {
        return;
      }
      return {
        token: token,
        expirationDate: new Date(expirationDate),
        userId: userId

      }
    }

    forgotPassword(data: {email: string}) : Observable<{message : string}> {
      return this.http.post<{message : string}>('api/user/forgotpassword', data);
    }

    resetPassword(body) : Observable<{success : boolean}>{
      const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type' :'application/json',
       'Authorization': `bearer ${body.token}`
     })
   }
   return this.http.put<{success: boolean}>(`api/user/resetpassword`,
   {password: body.password},
   httpOptions)
 }


    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
      }
}
