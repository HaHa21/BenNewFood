import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./authentication.component";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";


const AUTH_ROUTES: Routes = [

      { path: '', component: AuthenticationComponent , children: [
        { path: 'signup', component: SignupComponent },
        { path: 'signin', component: SigninComponent },
        { path: 'logout', component: LogoutComponent }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(AUTH_ROUTES)
  ],
  exports: [RouterModule]
})

export class AuthRouting {}
