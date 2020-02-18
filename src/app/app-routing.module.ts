import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassComponent } from './class/class.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService} from './auth-guard.service';

const routes: Routes = [
  // {path:'', component: TetComponent},
  { path: '', redirectTo : 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  // { path: 'viewContract', component: ViewContractComponent,canActivate: [AuthGuardService] },
  {path : 'users', component : ClassComponent},
];


@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}



