import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AUTH_PROVIDERS } from 'angular2-jwt'
import { AuthService } from './shared/services/auth.service';
import { NavComponent } from './nav/nav.component';
import { CallbackComponent } from './callback/callback.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { modules } from './shared/mat-common/mat-common.module'

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingComponent,
    NavComponent,
    CallbackComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://localhost:4200'],
        blacklistedRoutes: []
      }
    }),
    BrowserAnimationsModule,
    modules
  ],
  providers: [
    JwtHelperService,
    AuthService,
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
