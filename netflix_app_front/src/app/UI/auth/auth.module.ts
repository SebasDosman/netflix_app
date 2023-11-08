import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InterruptorComponent } from '../components/interruptor/interruptor.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NetLoaderComponent } from "../components/net-loader/net-loader.component";


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        InterruptorComponent,
        FooterComponent,
        NetLoaderComponent
    ],
})


export class AuthModule { }
