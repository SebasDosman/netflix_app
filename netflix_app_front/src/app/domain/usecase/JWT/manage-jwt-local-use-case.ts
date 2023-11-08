import { Injectable }   from "@angular/core";
import { JwtGateway }   from "../../models/JWT/gateway/jwt-gateway";
import { JwtModel }     from "../../models/JWT/jwtModel";

@Injectable({
    providedIn: 'root'
})
export class ManageJWTLocal{
    constructor( private _jwtGateway: JwtGateway ){}

    getTokenFromLocal(): JwtModel | null{
        return this._jwtGateway.getTokenFromLocal()
    }

    deleteTokenFromLocal(): void{
        this._jwtGateway.deleteTokenFromLocal()
    }

    saveTokenFromLocal( token: string ): JwtModel | null{
        return this._jwtGateway.saveTokenFromLocal( token )
    }

    saveTokenFromSesion( token: string ): JwtModel | null{
        return this._jwtGateway.saveTokenFromSesion( token )
    }

    getTokenInHeaders(): any{
        return this._jwtGateway.getTokenInHeaders()
    }
}