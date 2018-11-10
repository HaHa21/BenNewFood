import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Mainpages/home/home.component';
import { AboutUsComponent } from './Mainpages/about-us/about-us.component';
import { PromotionComponent } from './Mainpages/promotions/promotions.component';
import { SignupComponent } from './Mainpages/auth/signup.component';
import { MessageComponent } from './Mainpages/messages/message.component';
import { MessageListComponent } from './Mainpages/messages/message-list.component';

const routes : Routes = [
  { path: 'messagelist', component: MessageListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutUsComponent},
  { path: 'promotions', component: PromotionComponent},
  { path: 'create', component: MessageComponent},
  { path: 'edit/:postId', component: MessageComponent},
  { path: 'auth', loadChildren: './Mainpages/auth/auth.module#AuthModule'}

];

export const routing = RouterModule.forRoot(routes);
