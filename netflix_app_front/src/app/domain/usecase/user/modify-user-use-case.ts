import { Injectable } from "@angular/core";
import { UserGateway } from "../../models/user/gateway/user-gateway";
import { Observable } from "rxjs";
import { User } from "../../models/user/user";

@Injectable({
    providedIn: 'root'
})
export class ModifyUserUseCase{
    constructor( private _userGateway: UserGateway ){}

    updateUser(_id: string, user: User ): Observable<any> | null{
        return this._userGateway.updateUser( _id, user )
    }
    
    deleteUser(_id: string ): Observable<any> | null{
        return this._userGateway.deleteUser( _id )
    }
}