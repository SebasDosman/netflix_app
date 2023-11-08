import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Register, Login, JwtPayLoad } from "src/app/domain/models/auth/auth";
import { AuthGateway } from "src/app/domain/models/auth/gateway/auth-gateway";
import { JwtLocalManageService } from "../jwt-api/jwt-local-manage.service";
import { environment } from "src/environments/environment";
import { ManageJWTLocal } from "src/app/domain/usecase/JWT/manage-jwt-local-use-case";

@Injectable({
    providedIn: 'root'
})

export class AuthServiceService extends AuthGateway {

    constructor(private http        : HttpClient,
                private jwtService  : ManageJWTLocal) {
        super();
    }

    url = signal(environment.API_URL + "/auth")

    override register(user: Register): Observable<Register> | null {
        try {

            return this.http.post<Register>(this.url() + `/register`, user);

        } catch(error) {

            console.log( "Error in register Auth -> " + error )
            return null;

        }
    }

    override login(user: Login): Observable<Login> | null {
        try {

            return this.http.post<Login>(this.url() + `/login`, user);

        } catch(error) {

            console.log( "Error in login Auth -> " + error )
            return null;

        }
    }

    override checkToken(): Observable<any> | null {
        try {

            const headers = this.jwtService.getTokenInHeaders()
            
            return this.http.get<any>(this.url() + `/check-token`, { headers })

        } catch(error) {
            console.log( "Error in check-token Auth -> " + error )
            return null;
        }
    }

}
