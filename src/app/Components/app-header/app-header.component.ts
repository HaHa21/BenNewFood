import { Component, Input , OnInit, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from '../../Mainpages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, OnDestroy{


   private authListenerSubs : Subscription;
   private adminListenerSubs : Subscription;
   isAdmin = false;
   userIsAuthenticated = false;


@Output() toggleSidenav = new EventEmitter<void>();
   constructor(private authService: AuthService) {

   }

   ngOnInit(){
      this.isAdmin = this.authService.getAdminRole();
      this.userIsAuthenticated = this.authService.getisAuth();

      this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>  {
        this.userIsAuthenticated = isAuthenticated;
      
      });

      this.adminListenerSubs = this.authService.getAdminStatusListener().subscribe(isAdmin => {
        this.isAdmin = isAdmin;

      });





   }

   onLogout() {
     this.authService.logout();
   }

   ngOnDestroy(){
     this.authListenerSubs.unsubscribe();
     this.adminListenerSubs.unsubscribe();
   }
}
