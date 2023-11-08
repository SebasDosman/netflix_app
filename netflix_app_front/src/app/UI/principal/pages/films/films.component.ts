import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/UI/services/storage.service';
import { Content } from 'src/app/domain/models/content/content';
import { User } from 'src/app/domain/models/user/user';
import { JwtLocalManageService } from 'src/app/infraestructure/driven-adapter/jwt-api/jwt-local-manage.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent {

  private router = inject( Router )
  private jwt    = inject( JwtLocalManageService )

  public user    : User | null        = null
  public contents: Content[] | null   = null

  public loaded: boolean = false 

  ngOnInit(): void {

    const token = this.jwt.getTokenFromLocal();

    if ( !token ) {
      this.router.navigate(['auth']);
    }else{
      this.user     = JSON.parse( sessionStorage.getItem("user")! )

      this.contents = JSON.parse( sessionStorage.getItem("contentList")!).filter( (cont:any) => {
        return cont.isFilm === true
      })
      this.validarLoaded( this.user, this.contents )
    }

  }

  validarLoaded( user: any, contents: any ){
      if( user && contents ) this.loaded = true 
      else this.router.navigate(["/principal/home"])
  }
}
