import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContentGateway } from "../../models/content/gateway/content-gateway";
import { Content } from "../../models/content/content";


@Injectable({
    providedIn: 'root'
})
export class ModifyContentUseCase{
    constructor( private _contentGateway: ContentGateway ){}

    updateContent(_id: string, content: Content ): Observable<any> | null{
        return this._contentGateway.updateContent( _id, content )
    }
    
    deleteContent(_id: string ): Observable<any> | null{
        return this._contentGateway.deleteContent( _id )
    }
}