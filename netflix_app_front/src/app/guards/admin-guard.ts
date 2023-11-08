import { inject } from '@angular/core';
import { ManageJWTLocal } from '../domain/usecase/JWT/manage-jwt-local-use-case';
import { AuthServiceService } from '../infraestructure/driven-adapter/auth-api/auth-service.service';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

export const adminGuard = () => {

    const jwtManageLocal  = inject( ManageJWTLocal )
    const authService     = inject( AuthServiceService )
    const router          = inject( Router )

    const token = jwtManageLocal.getTokenFromLocal();
    const tokenObservable = authService.checkToken();

    if (token && tokenObservable) {

        return tokenObservable.pipe( map((res: any) => {
            
            if (res.user.roles.includes("admin")) {
                return true;
            }

            router.navigate(['/principal']);
            return false;
            
        }),catchError((err: any) => {
            console.error("Error al verificar el token: ", err);
            return [false];
        })
      );
    }

    router.navigate(['auth'])
    return false;

}