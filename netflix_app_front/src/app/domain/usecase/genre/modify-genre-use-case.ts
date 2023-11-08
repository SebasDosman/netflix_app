import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenreGateway } from "../../models/genre/gateway/genre-gateway";
import { Genre } from "../../models/genre/genre";


@Injectable({
    providedIn: 'root'
})
export class ModifyGenreUseCase{
    constructor( private _genreGateway: GenreGateway ){}

    updateUser(_id: string, genre: Genre ): Observable<any>{
        return this._genreGateway.updateGenre( _id, genre )
    }
    
    deleteUser(_id: string ): Observable<any>{
        return this._genreGateway.deleteGenre( _id )
    }
}