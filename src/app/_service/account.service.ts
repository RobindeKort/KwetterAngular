import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {Account} from '../_domain/account';
import {ACCOUNTS} from '../_domain/mock-accounts';

@Injectable()
export class AccountService {
  loggedInAccount: Account = null;

  private loggedInUrl = 'http://localhost:8080/Kwetter/api/auth';
  private accountsUrl = 'http://localhost:8080/Kwetter/api/users/admin/following';

  constructor(private http: HttpClient) {
  }

  updateLoggedIn(): void {
    this.http.get<Account>(this.loggedInUrl, {withCredentials: true})
      .subscribe(
        data => {
          this.loggedInAccount = data;
        },
        error => {
          this.loggedInAccount = null;
        }
      );
  }

  getAccounts(): Observable<Account[]> {
    // return of(ACCOUNTS);
    return this.http.get<Account[]>(this.accountsUrl, {withCredentials: true});
  }
}
