import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../../material-module';

import { AuthenticationComponent } from './authentication.component';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { LogoutComponent } from './logout.component';
import { AuthRouting } from './auth.routes';

@NgModule({
   declarations: [
     SigninComponent,
     SignupComponent,
     LogoutComponent,
     AuthenticationComponent
   ],
   imports: [
     CommonModule,
     ReactiveFormsModule,
     AuthRouting,
     DemoMaterialModule,
     FormsModule
   ]
})

export class AuthModule{

}
