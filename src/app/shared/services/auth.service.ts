import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as auth0 from 'auth0-js';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: environment.AUTH_CONFIG.CLIENT_ID,
    domain: environment.AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token',
    redirectUri: environment.AUTH_CONFIG.REDIRECT,
    audience: environment.AUTH_CONFIG.AUDIENCE,
    scope: environment.AUTH_CONFIG.SCOPE
  });
  accessToken: string;
  userProfile: any;
  expiresAt: number;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  loggingIn: boolean;

  constructor(private router: Router) {
    // If app auth token is not expired, request new token
    if (JSON.parse(localStorage.getItem('expires_at')) > Date.now()) {
      this.renewToken();
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    // Auth0 authorize request
    this._auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
      this.router.navigate(['/dashboard']);
    });
  }

  private _getProfile(authResult) {
    this.loggingIn = true;
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }

  private _setSession(authResult, profile?) {
    this.expiresAt = (authResult.expiresIn * 1000) + Date.now();
    // Store expiration in local storage to access in constructor
    localStorage.setItem('expires_at', JSON.stringify(this.expiresAt));
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    // Update login status in loggedIn$ stream
    this.setLoggedIn(true);
    this.loggingIn = false;
  }

  private _clearExpiration() {
    // Remove token expiration from localStorage
    localStorage.removeItem('expires_at');
  }

  logout() {
    // Remove data from localStorage
    this._clearExpiration();
    // End Auth0 authentication session
    this._auth0.logout({
      clientId: environment.AUTH_CONFIG.CLIENT_ID,
      returnTo: environment.BASE_URL
    });
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    return Date.now() < JSON.parse(localStorage.getItem('expires_at'));
  }

  renewToken() {
    // Check for valid Auth0 session
    this._auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this._getProfile(authResult);
      } else {
        this._clearExpiration();
      }
    });
  }

}