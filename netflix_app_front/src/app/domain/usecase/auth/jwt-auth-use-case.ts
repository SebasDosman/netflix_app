import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGateway } from "../../models/auth/gateway/auth-gateway";
import { JwtPayLoad } from "../../models/auth/auth";


@Injectable({
    providedIn: 'root'
})
export class JwtUseCase{
    constructor( private _jwtUsecase: AuthGateway ){}

    checkToken(): Observable<any> | null{
        return this._jwtUsecase.checkToken()
    }
}