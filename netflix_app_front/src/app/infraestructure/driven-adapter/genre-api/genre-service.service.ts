import { Injectable, signal }   from '@angular/core';
import { Observable, of, throwError }   from 'rxjs';
import { Genre } from '../../../domain/models/genre/genre';
import { GenreGateway } from 'src/app/domain/models/genre/gateway/genre-gateway';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtLocalManageService } from '../jwt-api/jwt-local-manage.service';


@Injectable({
  providedIn: 'root'
})
export class GenreServiceService extends GenreGateway {

    constructor(private http        : HttpClient, 
                private jwtService  : JwtLocalManageService) {
      super();
    }

    url = signal(environment.API_URL + "/genre")

    override postGenre(genre: Genre): Observable<Genre> | any {   
        try {

            const headers = this.jwtService.getTokenInHeaders();
            if (!headers) return throwError('Token not found');
            return this.http.post<Genre>(this.url(), genre, { headers: headers });

        } catch(error) {

            console.log( "Error in post Genre -> " + error )
            return null;

        }
    }

    override updateGenre(_id: string, genre: Genre): Observable<any> | any{
        try {

            const headers = this.jwtService.getTokenInHeaders();
            if (!headers) return throwError('Token not found');
            return this.http.patch<Genre>( this.url() + `/${ _id }`, genre, { headers: headers });

        } catch(error) {

            console.log( "Error in update Genre -> " + error )
            return null;

        }
    }

    override deleteGenre(_id: string): Observable<any> | any{
        try {

            const headers = this.jwtService.getTokenInHeaders();
            if (!headers) return throwError('Token not found')
            return this.http.delete<Genre>(this.url() + `/${ _id }`, { headers: headers });

        } catch(error) {

            console.log( "Error in delete Genre -> " + error )
            return null;

        }
    }

    override getById( _id : string ): Observable<Genre> | any{
        try {

            const headers = this.jwtService.getTokenInHeaders();
            if (!headers) return throwError('Token not found');
            return this.http.get<Genre>(this.url() + `/${ _id }`, { headers: headers });

        } catch (error) {

            console.log( "Error in getById Genre -> " + error )
            return null;

        }
    }

    override getAll(): Observable<Genre[]> | any{
        try {

            const headers = this.jwtService.getTokenInHeaders();
            if (!headers) return throwError('Token not found');
            return this.http.get<Genre[]>(this.url(), { headers: headers });

        } catch (error) {

            console.log( "Error in getAll Gnere -> " + error )
            return null

        }
    }
}

