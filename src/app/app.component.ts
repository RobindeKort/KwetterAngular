import {Component, OnInit} from '@angular/core';
import {AccountService} from './_service/account.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String = 'Kwetter';
  loggedIn: boolean;
  loggedInAccount: Account;

  constructor(private cookieService: CookieService, private accountService: AccountService) {
  }

  ngOnInit() {
    this.getLoggedInAccount();
  }

  getLoggedInAccount(): Account {
    // const token: string = this.cookieService.get('access_token');
    const token: string = localStorage.getItem('loggedInAccount');
    console.log(token);
    if (token !== null) {
      this.loggedIn = true;
      return this.loggedInAccount = JSON.parse(token);
    }
    this.loggedIn = false;
  }
}
