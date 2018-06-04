import {Component, OnInit} from '@angular/core';
import {AccountService} from './_service/account.service';
import {CookieService} from 'angular2-cookie/core';

import {Account} from './_domain/account';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchService} from './_service/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String = 'Kwetter';
  searchForm: FormGroup = new FormGroup({
    query: new FormControl()
  });
  loading: Boolean = false;

  constructor(private cookieService: CookieService,
              private accountService: AccountService,
              private searchService: SearchService,
              private router: Router) {
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

  search(): void {
    this.loading = true;
    const query = this.searchForm.get('query').value;
    this.searchService.searchKweets(query)
      .subscribe(
        kweets => {
          // console.log(kweets);
          this.loading = false;
          this.router.navigateByUrl('/search/' + query);
        },
        error => {
          // TODO robkor: show error notification
          this.loading = false;
        }
      );
  }
}
