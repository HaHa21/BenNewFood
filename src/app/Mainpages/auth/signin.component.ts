import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthData } from "./auth-data.model";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    userForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {

    }

    onSubmit() {

        this.authService.signin(this.userForm.value.email, this.userForm.value.password);

        this.userForm.reset();
    }


    ngOnInit() {
        this.userForm = new FormGroup({
            email: new FormControl(null,
                Validators.required

            ),
            password: new FormControl(null, Validators.required)
        });
    }

}
