import { Component, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthServiceService } from './infraestructure/driven-adapter/auth-api/auth-service.service';
import { StorageService } from './UI/services/storage.service';
import { ManageJWTLocal } from './domain/usecase/JWT/manage-jwt-local-use-case';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(){}

  private router          = inject(Router)
  private messageService  = inject( MessageService )
  private authService     = inject( AuthServiceService )
  private storageService  = inject( StorageService )
  private jwtManageLocal  = inject( ManageJWTLocal )
  private firstTime: boolean = true

  ngOnInit(): void {
    this.router.events.subscribe( event => {
      if( event instanceof NavigationEnd ){
        if( event.url !== "/auth" && event.url !== '/auth/register' && this.firstTime ){
          this.validate_token()
          this.storageService.setContentFullToStorage()
          return
        }
      }
    })
  }

  validate_token(){
    const token = this.jwtManageLocal.getTokenFromLocal()

    if ( token ) {
      this.authService.checkToken()?.subscribe(
        (res: any) => {
          this.firstTime = false

          if (res.user.roles.includes("admin")) {
            this.router.navigate(['/admin'])
          } else {
            this.router.navigate(['/principal/home'])
            // this.router.navigate(['/principal/trailer/651c96489412db914e85d33d'])
          }

          this.messageService.add({severity:'success', summary: 'Success', detail: `Welcome back ${ res.user.name }`});
        },
        (err: any) => {
        }
      );
    }else{
      this.router.navigate(['/auth'])
    }
  }
}
