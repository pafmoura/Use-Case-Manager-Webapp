import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './helper/auth.guard';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CreateUserComponent } from './create-user/create-user.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent},
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'manage-users', component: ManageUsersComponent},
  { path: 'create-user', component: CreateUserComponent },
  { path: '**', component: PageNotFoundComponent },
];
