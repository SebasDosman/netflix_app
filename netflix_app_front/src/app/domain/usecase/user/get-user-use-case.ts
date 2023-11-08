import { Injectable } from "@angular/core";
import { UserGateway } from "../../models/user/gateway/user-gateway";
import { Observable } from "rxjs";
import { User } from "../../models/user/user";

@Injectable({
    providedIn: 'root'
})
export class GetUserUseCase{
    constructor( private _userGateway: UserGateway ){}

    getUserById( _id: string ): Observable<User> | null{
        return this._userGateway.getById( _id )
    }

    getAllUsers(): Observable<User[]> | null{
        return this._userGateway.getAll()
    }
}