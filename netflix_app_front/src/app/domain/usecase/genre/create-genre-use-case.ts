import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenreGateway } from "../../models/genre/gateway/genre-gateway";
import { Genre } from "../../models/genre/genre";

@Injectable({
    providedIn: 'root'
})
export class CreateUserUseCase{
    constructor( private _genreGateway: GenreGateway ){}

    postUser( genre: Genre ): Observable<Genre>{
        return this._genreGateway.postGenre( genre )
    }
}