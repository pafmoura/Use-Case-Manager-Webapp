import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './helper/auth.guard';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ManageClientsComponent } from './manage-clients/manage-clients.component';
import { CreateUseCaseComponent } from './usecases/create-use-case/create-use-case.component';
import { ManageUseCasesComponent } from './usecases/manage-use-cases/manage-use-cases.component';
import { UsecaseDetailsComponent } from './usecases/usecase-details/usecase-details.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent},
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'manage-users', component: ManageUsersComponent},
  { path: 'create-user', component: CreateUserComponent },
  {path: 'manage-clients', component: ManageClientsComponent},
  {path: 'create-usecase', component: CreateUseCaseComponent},
  {path: 'manage-use-cases', component: ManageUseCasesComponent},
  {path: 'usecaseDetails/:id', component: UsecaseDetailsComponent},
  { path: '**', component: PageNotFoundComponent },
];
