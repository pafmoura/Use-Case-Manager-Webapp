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
import { CreateRuleModelComponent } from './rules/create-rule-model/create-rule-model.component';
import { TechniqueDetailsComponent } from './techniques/technique-details/technique-details.component';
import { ManageRuleModelsComponent } from './rules/manage-rule-models/manage-rule-models.component';
import { RuleModelDetailsComponent } from './rules/rule-model-details/rule-model-details.component';
import { ManageRulesComponent } from './rules/instances/manage-rules/manage-rules.component';
import { RuleDetailsComponent } from './rules/instances/rule-details/rule-details.component';
import { ReadRuleModelsComponent } from './rules/OperatorRead/read-rule-models/read-rule-models.component';
import { ReadUseCasesComponent } from './rules/OperatorRead/read-use-cases/read-use-cases.component';
import { MyInstanceRulesComponent } from './rules/OperatorRead/my-instance-rules/my-instance-rules.component';
import { StatisticsPageComponent } from './statistics/statistics-page/statistics-page.component';
import { EditUseCaseComponent } from './usecases/edit-use-case/edit-use-case.component';
import { ManageLogsourcesComponent } from './rules/manage-logsources/manage-logsources.component';
import { isAdminGuard } from './helper/is-admin.guard';

export const routes: Routes = [
  { path: '', component: LandingpageComponent},
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [isAdminGuard]},
  { path: 'create-user', component: CreateUserComponent, canActivate: [isAdminGuard] },
  {path: 'manage-clients', component: ManageClientsComponent, canActivate: [isAdminGuard]},
  {path: 'create-usecase', component: CreateUseCaseComponent, canActivate: [isAdminGuard]},
  {path: 'manage-use-cases', component: ManageUseCasesComponent},
  {path: 'usecaseDetails/:id', component: UsecaseDetailsComponent},
  {path: 'create-rule-model', component: CreateRuleModelComponent, canActivate: [isAdminGuard]},
  {path: 'techniqueDetails/:id', component: TechniqueDetailsComponent},
  {path: 'manage-rule-models', component: ManageRuleModelsComponent},
  {path: 'ruleModelDetails/:id', component: RuleModelDetailsComponent},
  {path: 'manage-rules', component: ManageRulesComponent},
  {path: 'ruleDetails/:id', component: RuleDetailsComponent},
  {path: 'read-rule-models', component: ReadRuleModelsComponent},
  {path: 'read-use-cases', component: ReadUseCasesComponent},
  {path: 'my-instance-rules', component: MyInstanceRulesComponent},
  {path: 'statistics', component: StatisticsPageComponent},
  {path: 'edit-usecase/:id', component: EditUseCaseComponent, canActivate: [isAdminGuard]},
  {path: 'manage-logsources', component: ManageLogsourcesComponent, canActivate: [isAdminGuard]},
  { path: '**', component: PageNotFoundComponent },
];
