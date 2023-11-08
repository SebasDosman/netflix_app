import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/infraestructure/driven-adapter/auth-api/auth-service.service';
import { JwtLocalManageService } from 'src/app/infraestructure/driven-adapter/jwt-api/jwt-local-manage.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  private jwt             = inject( JwtLocalManageService );
  private router          = inject( Router );
  private authService     = inject( AuthServiceService );

  private firstTime   : boolean = true
  public showContents : boolean = false;
  public showGenre    : boolean = false;
  public showUsers    : boolean = false;
  public showVolver   : boolean = true;

  constructor() { }

  ngOnInit() {
    const token = this.jwt.getTokenFromLocal();

    if ( !token ) {
      this.router.navigate(['auth']);
    }else{

      const token = this.jwt.getTokenFromLocal();

      if ( token ) {

        this.authService.checkToken()?.subscribe(
          (res: any) => {
            
            this.firstTime = false
            
            if (res.user.roles.includes("admin")) {
              this.router.navigate(['/admin'])
            } else {
              this.router.navigate(['/principal/home'])
            }
          },
          (err: any) => {
            console.error("Error al verificar el token: ", err);
          }
        );

      }else{
        this.router.navigate(['/auth'])
      } 
    }
  }

  toggleContents() {
    this.showContents = !this.showContents;
    this.showVolver = !this.showContents;
    this.showGenre = false;
    this.showUsers = false;
  }
  
  toggleGenre(){
    this.showGenre = !this.showGenre;
    this.showVolver = !this.showGenre;
    this.showContents = false;
    this.showUsers = false
  }

  toggleUser(){
    this.showUsers = !this.showUsers;
    this.showVolver = !this.showUsers;
    this.showGenre = false;
    this.showContents = false;
  }
  
  toggleVolver() {
    this.showVolver = !this.showVolver;
    this.showContents = false; 
    this.showGenre = false;
    this.showUsers = false;
  }

}
