import { Observable }   from "rxjs"     ;
import { User }         from "../user"  ;


export abstract class UserGateway{

    abstract getById(_id: string )                  : Observable<User>      | null
    abstract getAll ()                              : Observable<User[]>    | null
    abstract postUser( user: User )                 : Observable<User>      | null
    abstract updateUser( _id: string, user: User )  : Observable<any>       | null
    abstract deleteUser( _id: string )              : Observable<any>       | null
}

