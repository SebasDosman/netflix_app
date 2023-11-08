import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUseCase } from 'src/app/domain/usecase/auth/login-auth-use-case';
import { JwtLocalManageService } from 'src/app/infraestructure/driven-adapter/jwt-api/jwt-local-manage.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public loginForm       : FormGroup = new FormGroup({});
  public recordar        : boolean   = true;
  public token           : string    = "";
  public loaded          : boolean   = true;

  constructor( private messageService: MessageService,
               private _fb           : FormBuilder  ,
               private loginUseCase  : LoginUseCase ,
               private jwt           : JwtLocalManageService,
               private router        : Router,
    ){
    this.loginForm = this._fb.group({
      email       : ['', [Validators.required, Validators.email]],
      password    : ['', Validators.required],
      recordar    : this.recordar,
    });
  }

  ngOnInit() {

  }

  validarUsuarioDB(): Promise<any>{
    if(!this.loginForm.value.recordar){
      this.recordar = false;
    }

    try{

      const user = {
        "email": this.loginForm.value['email'],
        "password": this.loginForm.value['password']
      }

      this.loaded = false;

      return new Promise( (resolve, reject ) =>{
        this.loginUseCase.login( user )?.subscribe({
          next: ( data ) =>{
            resolve( data )
          }, error: ( err ) =>{
            this.loaded = true;

            this.messageService.add({ severity:'error', summary: 'Error', detail: err.error.message });
            reject( err )
          }
        })
      })
    } catch( err ){
      this.messageService.add({ severity:'error', summary: 'Error', detail: 'Please contact us' });

      this.loginForm.reset();

      return new Promise(()=>{})
    }
  }

  submitForm(): void{
    if ( this.validarObligatorios() ) return

    try {
      if ( this.loginForm.valid ) {
        this.validarUsuarioDB().then( data =>{
          this.token = data.token

          if (this.loginForm.value.recordar){
            this.jwt.saveTokenFromLocal(this.token)
          }else{
            this.jwt.saveTokenFromSesion(this.token)
          }
          this.messageService.add({ severity:'success', summary: 'Success', detail: 'Session started successfully' });

          if (data.user.roles.includes("admin")) {
            this.router.navigate(['/admin'])
          } else {
            this.router.navigate(['/principal/home'])
          }

        }).catch( err =>{
          this.loginForm.reset();
        })
      } else {
        this.messageService.add({ severity:'warn', summary: 'Warning', detail: 'Enter a valid email and/or password, all fields are required' });

        this.loginForm.reset();
      }
    } catch (error) {
      this.messageService.add({ severity:'error', summary: 'Error', detail: 'Please contact us' });
    }
  }

  validarObligatorios(): boolean{
    const formulario = this.loginForm.controls;
    const validacion = formulario['email'].invalid || formulario['password'].invalid

    if( validacion ){
      this.messageService.add({ severity:'warn', summary: 'Warning', detail: 'It is essential to properly complete all fields' });
      this.loginForm.markAllAsTouched();

      return true
    }
    return false
  }
}
