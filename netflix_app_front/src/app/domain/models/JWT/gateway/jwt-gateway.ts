import { Observable } from "rxjs";
import { JwtModel } from "../jwtModel";

export abstract class JwtGateway{
    abstract getTokenFromLocal   ()             : JwtModel | null;
    abstract deleteTokenFromLocal()             : void;
    abstract saveTokenFromLocal  (token: string): JwtModel | null;
    abstract saveTokenFromSesion (token: string): JwtModel | null;
    abstract getTokenInHeaders()                : any      | null;
}