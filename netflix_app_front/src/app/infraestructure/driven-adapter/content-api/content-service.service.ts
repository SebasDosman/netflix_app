import { HttpClient } from '@angular/common/http';
import { Injectable, signal }   from '@angular/core';
import { Observable, Subject, interval, of, takeUntil }   from 'rxjs';
import { Content } from 'src/app/domain/models/content/content';
import { ContentGateway } from 'src/app/domain/models/content/gateway/content-gateway';
import { ManageJWTLocal } from 'src/app/domain/usecase/JWT/manage-jwt-local-use-case';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})

export class ContentServiceService extends ContentGateway {

    constructor(    private http        : HttpClient    ,
                    private manageJwt   : ManageJWTLocal  ) {
      super();
    }
    private destroy$: Subject<void> = new Subject()

    url = signal(environment.API_URL + "/content")

    override postContent(content: Content): Observable<Content> | null {

        try {
            const headers = this.manageJwt.getTokenInHeaders()
            return this.http.post<Content>( this.url(), content, { headers } )
        } catch (error) {

            console.log( "Error in post Content -> " + error )
            return null
        }
    }

    override updateContent(_id: string, content: Content): Observable<any> | null {

        try {

            const headers = this.manageJwt.getTokenInHeaders()
            return this.http.patch<Content>( this.url() + `/${ _id }`, content, { headers } )
        } catch (error) {

            console.log( "Error in patch Content -> " + error )
            return null
        }
    }

    override deleteContent(_id: string): Observable<any> | null {

        try {
            const headers = this.manageJwt.getTokenInHeaders()
            return this.http.delete<Content>( this.url() + `/${ _id }`, { headers } )
        } catch (error) {

            console.log( "Error in delete Content -> " + error )
            return null
        }
    }

    override findByQuery(query: string ): Observable<Content | Content[]> | null {

        try {
            const headers = this.manageJwt.getTokenInHeaders()
            return this.http.get<Content>( this.url() + `/query/${ query }`, { headers } )
        } catch (error) {

            console.log( "Error in findByQuery Content -> " + error )
            return null
        }
    }

    override getById( _id : string ): Observable<Content> | null {

        try {

            const headers = this.manageJwt.getTokenInHeaders()
            return this.http.get<Content>( this.url() + `/${ _id }`, { headers } )
        } catch (error) {

            console.log( "Error in getById Content -> " + error )
            return null
        }
    }

    override getAll(): Observable<Content[]> | null {
        try {
            const headers = this.manageJwt.getTokenInHeaders()
            return this.http.get<Content[]>( this.url(), { headers } )
        } catch (error) {

            console.log( "Error in getAll Content -> " + error )
            return null
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }
}
