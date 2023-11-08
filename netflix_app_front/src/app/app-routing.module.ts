import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guards/login-guard';
import { adminGuard } from './guards/admin-guard';


const routes: Routes = [
  { 
    path: 'auth', 
    loadChildren: () => import('./UI/auth/auth.module').then(m => m.AuthModule) 
  },
  { 
    path: 'principal', 
    loadChildren: () => import('./UI/principal/principal.module').then(m => m.PrincipalModule) ,
    canActivate: [loginGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./UI/admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminGuard]
  },
  { 
    path: '**', 
    redirectTo: 'auth'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
