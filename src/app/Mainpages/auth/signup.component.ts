﻿import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
private authStatusSub: Subscription;

  constructor(private authService: AuthService) { }



  ngOnInit() {
     this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
   authStatus => {
     this.isLoading = false;
   }
    );
   }

    onSignup(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.isLoading = true;
      this.authService.signup(form.value.email, form.value.password);
    }

    ngOnDestroy() {
  this.authStatusSub.unsubscribe();
  this.isLoading = false;
}
}
