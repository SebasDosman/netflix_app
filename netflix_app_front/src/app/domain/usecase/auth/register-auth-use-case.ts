import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGateway } from "../../models/auth/gateway/auth-gateway";
import { Register } from "../../models/auth/auth";


@Injectable({
    providedIn: 'root'
})


export class RegisterUseCase{
    constructor(
      private _registerGateway: AuthGateway ){}

    register( user: Register ): Observable<Register> | null{
        return this._registerGateway.register( user )
    }
}
