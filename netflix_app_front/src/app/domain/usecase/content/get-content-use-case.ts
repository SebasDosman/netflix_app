import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Content } from "../../models/content/content";
import { ContentGateway } from "../../models/content/gateway/content-gateway";
import { query } from "@angular/animations";


@Injectable({
    providedIn: 'root'
})
export class GetContentUseCase{
    constructor( private _contentGetway: ContentGateway ){}

    getUserById( _id: string ): Observable<Content> | null {
        return this._contentGetway.getById( _id )
    }

    getAllContent(): Observable<Content[]> | null {
        return this._contentGetway.getAll()
    }

    findByQuery( query: string ): Observable<Content[] | Content> | null {
        return this._contentGetway.findByQuery( query )
    }
}