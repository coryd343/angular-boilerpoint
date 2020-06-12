import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CallbackComponent } from './callback/callback.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UserAuthorizedGuard } from 'src/app/shared/guards/user-authorized'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent
  },
  {
    path: 'landing',
    pathMatch: 'full',
    component: LandingComponent
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [UserAuthorizedGuard],
    component: DashboardComponent
  },
  {
    path: 'callback',
    pathMatch: 'full',
    component: CallbackComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    canActivate: [UserAuthorizedGuard],
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
