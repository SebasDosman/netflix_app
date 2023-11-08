import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenreGateway } from "../../models/genre/gateway/genre-gateway";
import { Genre } from "../../models/genre/genre";


@Injectable({
    providedIn: 'root'
})
export class GetGenreUseCase{
    constructor( private _genreGetway: GenreGateway ){}

    getUserById( _id: string ): Observable<Genre>{
        return this._genreGetway.getById( _id )
    }

    getAllGenre(): Observable<Genre[]>{
        return this._genreGetway.getAll()
    }
}