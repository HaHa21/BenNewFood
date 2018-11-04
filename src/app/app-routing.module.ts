import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Mainpages/home/home.component';
import { AboutUsComponent } from './Mainpages/about-us/about-us.component';
import { PromotionComponent } from './Mainpages/promotions/promotions.component';
import { SignupComponent } from './Mainpages/auth/signup.component';
import { MessagesComponent } from "./Mainpages/messages/messagetemplate.component";

const routes : Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutUsComponent},
  { path: 'promotions', component: PromotionComponent},
  { path: 'messages', component: MessagesComponent},
  { path: 'auth', loadChildren: './Mainpages/auth/auth.module#AuthModule'}

];

export const routing = RouterModule.forRoot(routes);
