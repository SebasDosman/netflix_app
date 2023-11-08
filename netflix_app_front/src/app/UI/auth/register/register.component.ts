import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUseCase } from 'src/app/domain/usecase/auth/register-auth-use-case';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({})
  public loaded: boolean  = true;

  icons = [
    { name: 'Icono 1', url: './assets/icon1.png' },
    { name: 'Icono 2', url: './assets/icon2.png' },
    { name: 'Icono 3', url: './assets/icon3.png' },
    { name: 'Icono 4', url: './assets/icon4.png' }
  ];

  constructor( private _fb              : FormBuilder,
               private messageService   : MessageService,
               private registerUseCase  : RegisterUseCase,
               private router           : Router
  ) {
    this.registerForm = this._fb.group({
      name            : ['', [Validators.required, Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/), Validators.maxLength(50)]],
      lname           : ['', [Validators.required, Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/), Validators.maxLength(50)]],
      email           : ['', [Validators.required, Validators.email]],
      selectedIcon    : [null, Validators.required],
      password        : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required, this.validateConfirm.bind(this)]],
    });
  }

  ngOnInit() {}

  submitForm(){
    if ( this.validarObligatorios() ) return

    try{
      const user = {
        "name": this.registerForm.value['name'] + " " + this.registerForm.value['lname'],
        "email": this.registerForm.value['email'],
        "password": this.registerForm.value['password'],
        "imageUrl": this.registerForm.value['selectedIcon'].url,
        "favoriteList": [],
        "historyList": []
      }

      this.loaded = false;

      return new Promise( (resolve, reject ) =>{
        this.registerUseCase.register( user )?.subscribe({
          next: ( data ) =>{
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Registration done successfully'});

            resolve( data )
            this.router.navigate(['auth']);
          }, error: ( err ) =>{
            this.loaded = true;

            this.messageService.add({ severity:'error', summary: 'Error', detail: err.error.message });

            this.registerForm.reset();
            reject( err )
          }
        })
      })
    } catch( err ){
      this.messageService.add({ severity:'error', summary: 'Error', detail: 'Please contact us' });

      this.registerForm.reset();
      return new Promise(()=>{})
    }
  }

  validarObligatorios(): boolean{
    const formulario = this.registerForm.controls;
    const validacion = formulario['email'].invalid || formulario['password'].invalid || formulario['name'].invalid || formulario['lname'].invalid || formulario['confirmPassword'].invalid

    if( validacion ){
      this.messageService.add({ severity:'warn', summary: 'Warning', detail: 'It is essential to properly complete all fields' });

      this.registerForm.markAllAsTouched();
      return true
    }
    return false
  }

  validateConfirm(control: AbstractControl): { [key: string]: any } | null {
    const contrasenia = this.registerForm.get('password')?.value;
    const confirmContra = control.value;

    if (contrasenia === confirmContra) {
      return null;
    }
    return { contraseniaNoCoincide: true };
  }
}


