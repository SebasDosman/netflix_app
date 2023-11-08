import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { UserGateway } from 'src/app/domain/models/user/gateway/user-gateway';
import { User } from 'src/app/domain/models/user/user';
import { environment } from 'src/environments/environment.development';
import { JwtLocalManageService } from '../jwt-api/jwt-local-manage.service';
import { ManageJWTLocal } from 'src/app/domain/usecase/JWT/manage-jwt-local-use-case';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService extends UserGateway {

  constructor(private http        : HttpClient, 
              private jwtService  : JwtLocalManageService,
              private manageJWT   : ManageJWTLocal ) {
    super();
  }

  url = signal(environment.API_URL + "/user")

  override getById(_id: string): Observable<User> | null {
    try {

      const headers = this.jwtService.getTokenInHeaders();
      if (!headers) return throwError('Token not found');
      
      return this.http.get<User>(this.url() + `/${ _id }`, { headers: headers });

    } catch (error) {

      console.log( "Error in getById User -> " + error )
      return null;

    }
  }

  override getAll(): Observable<User[]> | any{
    try {

      const headers = this.jwtService.getTokenInHeaders();
      if (!headers) return throwError('Token not found');
      
      return this.http.get<User[]>(this.url(), { headers: headers });

    } catch (error) {

      console.log( "Error in getAll User -> " + error )
      return null

    }
  }

  override postUser(user: User): Observable<User> | null {
    try {

      const headers = this.jwtService.getTokenInHeaders();
      if (!headers) return throwError('Token not found');
      return this.http.patch<User>(this.url(), user, { headers: headers });

    } catch(error) {

      console.log( "Error in post User -> " + error )
      return null;

    }
  }

  override updateUser(_id: string, user: User): Observable<any> | null {
    try {

      const headers = this.manageJWT.getTokenInHeaders();
      return this.http.patch<User>( this.url() + `/${ _id }`, user, { headers });

  } catch(error) {

      console.log( "Error in update User -> " + error )
      return null;
  }
  }

  override deleteUser(_id: string): Observable<any> | null {
    try {

      const headers = this.jwtService.getTokenInHeaders();
      if (!headers) return throwError('Token not found')
      return this.http.delete<User>(this.url() + `/${ _id }`, { headers: headers });

    } catch(error) {

      console.log( "Error in delete User -> " + error )
      return null;

    }
  }
}