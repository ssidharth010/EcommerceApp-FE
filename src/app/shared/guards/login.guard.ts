import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

    constructor(private _router: Router, private _authenticationService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this._authenticationService.currentUserValue;
        
        if (currentUser) {
            this._router.navigate(['/app/home'])
            return false;
        }
        return true;
    }
}
