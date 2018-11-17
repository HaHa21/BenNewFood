import { Component, Input , OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { AppHeader } from './app-header.model';
import { AuthService } from '../../Mainpages/auth/auth.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, OnDestroy{
    role;
   @Input() appheader: AppHeader;
   private authListenerSubs : Subscription;
   userIsAuthenticated = false;


   constructor(private authService: AuthService) {

   }

   ngOnInit(){
      this.role = localStorage.getItem('role');
      this.userIsAuthenticated = this.authService.getisAuth();
      this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>  {
        this.userIsAuthenticated = isAuthenticated;
      });
   }

   onLogout() {
     this.authService.logout();
   }

   ngOnDestroy(){
     this.authListenerSubs.unsubscribe();
   }
}
