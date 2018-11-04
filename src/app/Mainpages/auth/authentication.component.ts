import { Component, OnInit, OnDestroy} from "@angular/core";
import { AuthService } from "./auth.service";
import { AuthData } from "./auth-data.model";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent implements OnInit{


    constructor() {

    }

    ngOnInit(){



    }


}
