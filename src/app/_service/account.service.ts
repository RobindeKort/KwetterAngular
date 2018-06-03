import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import {of} from 'rxjs/observable/of';

import {Account} from '../_domain/account';
import {ACCOUNTS} from '../_domain/mock-accounts';
import {Kweet} from '../_domain/kweet';

@Injectable()
export class AccountService {
  loggedInAccount: Account = null;

  private authUrl = 'http://localhost:8080/Kwetter/api/auth/';
  private accountUrl = 'http://localhost:8080/Kwetter/api/users/';

  constructor(private http: HttpClient) {
  }

  private getLoggedInRequest(): Observable<Account> {
    return this.http.get<Account>(this.authUrl, {withCredentials: true});
  }

  updateLoggedIn(): void {
    this.getLoggedInRequest()
      .subscribe(
        data => this.loggedInAccount = data,
        error => this.loggedInAccount = null
      );
  }

  postKweet(kweetBody: string): Observable<Kweet> {
    const body = new URLSearchParams();
    body.set('body', kweetBody);
    const newUrl = this.authUrl + 'kweet';
    return this.http.post<Kweet>(newUrl, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    });
  }

  getKweets(userName: string): Observable<Kweet[]> {
    // return of(ACCOUNTS);
    const newUrl = this.accountUrl + userName + '/kweets';
    // console.log(newUrl);
    return this.http.get<Kweet[]>(newUrl, {withCredentials: true});
  }

  getFollowingKweets(): Observable<Kweet[]> {
    return this.getLoggedInRequest()
      .flatMap(acc => {
        const newUrl = this.accountUrl + acc.userName + '/following/kweets';
        return this.http.get<Kweet[]>(newUrl, {withCredentials: true});
      });
  }
}
