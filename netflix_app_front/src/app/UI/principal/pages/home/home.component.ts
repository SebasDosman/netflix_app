import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/UI/services/storage.service';
import { Content } from 'src/app/domain/models/content/content';
import { User } from 'src/app/domain/models/user/user';
import { JwtGateway } from '../../../../domain/models/JWT/gateway/jwt-gateway';
import { JwtLocalManageService } from 'src/app/infraestructure/driven-adapter/jwt-api/jwt-local-manage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  private router      = inject( Router )
  private storageServ = inject( StorageService )
  private jwt         = inject( JwtLocalManageService )

  public user    : User      | null   = null
  public contents: Content[] | null   = null

  public loaded: boolean = false

  ngOnInit(): void {
    const token = this.jwt.getTokenFromLocal();

    if ( !token ) {
      this.router.navigate(['auth']);
    }else{
      this.getData();
    }

  }

  getData(){
    this.storageServ.getLoadedData().subscribe( data =>{
      this.user = JSON.parse( sessionStorage.getItem("user")! )
      this.contents = JSON.parse( sessionStorage.getItem("contentList")!)
      this.validarLoaded( this.user, this.contents )
    });
  }

  validarLoaded( user: any, contents: any ){
    if( user && contents ) this.loaded = true 
    else setTimeout( () => this.getData(), 2000)
  }

}
