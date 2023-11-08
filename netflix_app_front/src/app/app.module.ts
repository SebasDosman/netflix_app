import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserGateway } from './domain/models/user/gateway/user-gateway';
import { UserServiceService } from './infraestructure/driven-adapter/user-api/user-service.service';

import { HttpClientModule } from '@angular/common/http';
import { JwtGateway } from './domain/models/JWT/gateway/jwt-gateway';
import { JwtLocalManageService } from './infraestructure/driven-adapter/jwt-api/jwt-local-manage.service';
import { ContentGateway } from './domain/models/content/gateway/content-gateway';
import { ContentServiceService } from './infraestructure/driven-adapter/content-api/content-service.service';
import { GenreGateway } from './domain/models/genre/gateway/genre-gateway';
import { GenreServiceService } from './infraestructure/driven-adapter/genre-api/genre-service.service';
import { AuthServiceService } from './infraestructure/driven-adapter/auth-api/auth-service.service';
import { AuthGateway } from 'src/app/domain/models/auth/gateway/auth-gateway';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule            ,
    AppRoutingModule        ,
    HttpClientModule        ,
    BrowserAnimationsModule ,
    BrowserModule           ,
    ToastModule             ,
  ],
  providers: [
    MessageService,
    { provide: UserGateway,     useClass: UserServiceService    },
    { provide: JwtGateway ,     useClass: JwtLocalManageService },
    { provide: ContentGateway,  useClass: ContentServiceService },
    { provide: GenreGateway,    useClass: GenreServiceService   },
    { provide: AuthGateway,     useClass: AuthServiceService    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class AppModule { }
