import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserAuthorizedGuard implements CanActivate {
    constructor(private auth: AuthService) {}

    public userAuthorized(): boolean {
        return this.auth.loggedIn;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.userAuthorized();
    }
}