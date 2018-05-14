import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {Account} from '../_domain/account';
import {ACCOUNTS} from '../_domain/mock-accounts';

@Injectable()
export class AccountService {

  private accountsUrl = 'http://localhost:8080/Kwetter/api/users/admin/following';

  constructor(private http: HttpClient) {
  }

  getAccounts(): Observable<Account[]> {
    // return of(ACCOUNTS);
    return this.http.get<Account[]>(this.accountsUrl);
  }
}
