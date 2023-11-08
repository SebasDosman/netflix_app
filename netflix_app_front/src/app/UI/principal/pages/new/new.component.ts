import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/UI/services/storage.service';
import { Content } from 'src/app/domain/models/content/content';
import { User } from 'src/app/domain/models/user/user';
import { JwtLocalManageService } from 'src/app/infraestructure/driven-adapter/jwt-api/jwt-local-manage.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {

  private router = inject( Router )
  private jwt    = inject( JwtLocalManageService )

  public user    : User | null        = null
  public contents: Content[] | null   = null
  public title   : string             = "New";

  public loaded: boolean = false 

  ngOnInit(): void {

    const token = this.jwt.getTokenFromLocal();

    if ( !token ) {
      this.router.navigate(['auth']);
    }else{
      this.user     = JSON.parse( sessionStorage.getItem("user")! )

      this.contents = JSON.parse( sessionStorage.getItem("contentList")!).filter( (cont:any) => this.getOnlyOneYearAgo(cont) )
    
      this.contents = this.contents!.map( (cont:any) => this.changeTag(cont))

      this.validarLoaded( this.user, this.contents )
    }

  }



  changeTag( cont: any ){
    
      cont.tags.map( (contag: any, index:number ) =>{

        if( !(contag == "Popular on Netflix") && !(contag == "Trending Now")){
          cont.tags.splice( index, 1 )
        }

        if( contag == "Popular on Netflix" ){
          cont.tags[index]  = "New on Netflix"
        }
        
        if( contag == "Trending Now"){
          cont.tags[index] ="Worh the Wait"
        }

        return cont
      })
    
    return cont
  }

  getOnlyOneYearAgo( cont: any ){
  
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear( new Date().getFullYear() - 1 )
    
    return new Date( cont.releaseAt ) >= oneYearAgo 
  }


  validarLoaded( user: any, contents: any ){
      if( user && contents ) this.loaded = true 
      else this.router.navigate(["/principal/home"])
  }
}
