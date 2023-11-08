import { Injectable }   from '@angular/core';
import { JwtGateway } from 'src/app/domain/models/JWT/gateway/jwt-gateway';
import { JwtModel } from 'src/app/domain/models/JWT/jwtModel';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JwtLocalManageService  extends JwtGateway {
  
  constructor() {
    super();
  }

  override getTokenFromLocal(): JwtModel | null{

    if( sessionStorage.getItem("token") ){
      return {token: JSON.parse( sessionStorage.getItem("token")!) }

    } else if( localStorage.getItem("token") ){
      return { token: JSON.parse( localStorage.getItem("token")! ) }
    }
    else return null
  }
  
  override deleteTokenFromLocal(): void {
    
    
    localStorage.getItem("token") && localStorage.removeItem("token")
  }

  override saveTokenFromLocal( _token: string): JwtModel | null {
    
    localStorage.setItem( "token", JSON.stringify(_token)! )

    const tokenCreated = JSON.parse(localStorage.getItem("token")!)

    if( !tokenCreated ) return null
    return { token: tokenCreated }
  }
  
  override saveTokenFromSesion( _token: string): JwtModel | null {
    
    sessionStorage.setItem( "token", JSON.stringify(_token)! )

    const tokenCreated = JSON.parse(sessionStorage.getItem("token")!)

    if( !tokenCreated ) return null
    return { token: tokenCreated }
  }

  override getTokenInHeaders() {
    
    const token = this.getTokenFromLocal()?.token
    if( !token ) return null
    return new HttpHeaders({ 'Authorization': 'Bearer ' + token })
  }

}


