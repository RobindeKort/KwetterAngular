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

  getLoggedIn(): Observable<Account> {
    return this.http.get<Account>(this.authUrl, {withCredentials: true});
  }

  updateLoggedIn(): void {
    this.getLoggedIn()
      .subscribe(
        data => this.loggedInAccount = data,
        error => this.loggedInAccount = null
      );
  }

  getAccount(userName: string): Observable<Account> {
    const newUrl = this.accountUrl + userName;
    return this.http.get<Account>(newUrl);
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
    return this.http.get<Kweet[]>(newUrl);
  }

  getFollowingKweets(userName: string): Observable<Kweet[]> {
    const newUrl = this.accountUrl + userName + '/following/kweets';
    return this.http.get<Kweet[]>(newUrl);
  }

  getFollowing(userName: string): Observable<Account[]> {
    const newUrl = this.accountUrl + userName + '/following';
    return this.http.get<Account[]>(newUrl);
  }

  getFollowedBy(userName: string): Observable<Account[]> {
    const newUrl = this.accountUrl + userName + '/followedBy';
    return this.http.get<Account[]>(newUrl);
  }
}
