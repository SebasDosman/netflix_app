import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Content } from '../../models/content/content';
import { ContentGateway } from "../../models/content/gateway/content-gateway";


@Injectable({
    providedIn: 'root'
})
export class CreateContentUseCase{
    constructor( private _contentGateway: ContentGateway ){}

    postUser( content: Content ): Observable<Content> | null{
        return this._contentGateway.postContent( content )
    }
}