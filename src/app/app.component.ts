import {Component, OnInit} from '@angular/core';
import {AccountService} from './_service/account.service';
import {CookieService} from 'angular2-cookie/core';

import {Account} from './_domain/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String = 'Kwetter';

  constructor(private cookieService: CookieService, private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.updateLoggedIn();
  }

  isLoggedIn(): boolean {
    if (this.accountService.loggedInAccount !== null) {
      return true;
    }
    return false;
  }

  getLoggedIn(): Account {
    return this.accountService.loggedInAccount;
  }
}
