import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGateway } from "../../models/auth/gateway/auth-gateway";
import { Login } from "../../models/auth/auth";


@Injectable({
    providedIn: 'root'
})


export class LoginUseCase{
    constructor( private _loginUsecase: AuthGateway ){}

    login( user: Login ): Observable<Login> | null{
        return this._loginUsecase.login( user )
    }
}
