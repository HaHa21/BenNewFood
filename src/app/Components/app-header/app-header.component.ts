import { Component, Input , OnInit, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from '../../Mainpages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, OnDestroy{
    role;

   private authListenerSubs : Subscription;
   
   userIsAuthenticated = false;

@Output() toggleSidenav = new EventEmitter<void>();
   constructor(private authService: AuthService) {

   }

   ngOnInit(){
      this.role = this.authService.getRole();
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
