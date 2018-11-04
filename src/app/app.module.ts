import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DemoMaterialModule } from 'src/material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './Components/app-header/app-header.component';
import { AppFooterComponent } from './Components/app-footer/app-footer.component';
import { AppBodyComponent } from './Components/app-body/app-body.component';
import { AboutUsComponent } from './Mainpages/about-us/about-us.component';
import { routing } from './app-routing.module';
import { MessageModule } from './Mainpages/messages/message.module';
import { HomeComponent } from './Mainpages/home/home.component';
import { PromotionComponent } from './Mainpages/promotions/promotions.component';
import { PostBannerComponent } from './Mainpages/post/post-banner.component';
import { PostService } from './Mainpages/post/post.service';
import { AuthService } from './Mainpages/auth/auth.service';
import { HealthComponent } from './Mainpages/health/health.component';
import { PostComponent } from './Mainpages/post/post.directive';
import { ErrorComponent } from './Components/errors/error.component';
import { AuthInterceptor } from "./Mainpages/auth/auth-interceptor";
import { ErrorInterceptor } from "./Components/errors/error-interceptor";
//import { MessageModule } from './Mainpages/messages/message.module';
//import { CartComponent } from './Components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppBodyComponent,
    AboutUsComponent,
    HomeComponent,
    PromotionComponent,
    HealthComponent,
    PostComponent,
    PostBannerComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    MessageModule,
    DemoMaterialModule,
    NgxPaginationModule

  ],


  entryComponents: [
      PromotionComponent, HealthComponent, ErrorComponent
  ],
  providers: [
      PostService,

  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
