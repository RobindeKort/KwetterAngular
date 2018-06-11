import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {CookieService} from 'angular2-cookie/services/cookies.service';

import {AppComponent} from './app.component';
import {AccountComponent} from './account/account.component';
import {AccountService} from './_service/account.service';
import {AppRoutingModule} from './/app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from './_service/authentication.service';
import {LogoutComponent} from './logout/logout.component';
import {SearchService} from './_service/search.service';
import { SearchComponent } from './search/search.component';
import {WebsocketService} from './_service/websocket.service';
import {TimelineService} from './_service/timeline.service';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    DashboardComponent,
    LoginComponent,
    LogoutComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    CookieService,
    AccountService,
    AuthenticationService,
    SearchService,
    TimelineService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
