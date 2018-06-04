import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account/account.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  // {path: 'following', component: AccountComponent},
  {path: 'users/:userName', component: AccountComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'logout' , component: LogoutComponent},
  {path: 'search/:query' , component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
