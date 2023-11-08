import { Injectable } from "@angular/core";
import { UserGateway } from "../../models/user/gateway/user-gateway";
import { Observable } from "rxjs";
import { User } from "../../models/user/user";

@Injectable({
    providedIn: 'root'
})
export class CreateUserUseCase{
    constructor( private _userGateway: UserGateway ){}

    postUser( user: User ): Observable<User> | null{
        return this._userGateway.postUser( user )
    }
}