import { Observable }   from "rxjs"     ;
import { Genre }         from "../genre"  ;


export abstract class GenreGateway{
    abstract getById(_id: string )                   : Observable<Genre>
    abstract getAll ()                               : Observable<Genre[]>
    abstract postGenre( genre: Genre )               : Observable<Genre>
    abstract updateGenre( _id: string, genre: Genre ): Observable<any>
    abstract deleteGenre( _id: string )              : Observable<any>
}