import { Observable } from "rxjs";
import { JwtPayLoad, Login, Register } from "../auth";

export abstract class AuthGateway {
  abstract register( user: Register )     : Observable<Register>  | null;
  abstract login( user:Login )            : Observable<Login>     | null;
  abstract checkToken()                   : Observable<any>| null;
}
