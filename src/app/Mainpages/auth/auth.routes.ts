import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./authentication.component";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

const AUTH_ROUTES: Routes = [

      { path: '', component: AuthenticationComponent , children: [
        { path: 'signup', component: SignupComponent },
        { path: 'signin', component: SigninComponent },
        { path: 'logout', component: LogoutComponent },
        { path: 'signin/forgot-password', component: ForgotPasswordComponent },
        {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
        }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(AUTH_ROUTES)
  ],
  exports: [RouterModule]
})

export class AuthRouting {}
