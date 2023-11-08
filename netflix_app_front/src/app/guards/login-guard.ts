import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthServiceService } from "../infraestructure/driven-adapter/auth-api/auth-service.service"
import { ManageJWTLocal } from "../domain/usecase/JWT/manage-jwt-local-use-case"

export const loginGuard = () => {

    const jwtManageLocal  = inject( ManageJWTLocal )
    const authService     = inject( AuthServiceService )
    const router          = inject( Router )

    if ( localStorage.getItem('token') || sessionStorage.getItem('token') ){
        return true
    }

    router.navigate(['/auth'])
    return false

}