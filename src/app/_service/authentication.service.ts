import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private authUrl = 'http://localhost:8080/Kwetter/api/auth';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    console.log(body.get('username'));
    console.log(body.get('password'));
    return this.http.post<Account>(this.authUrl, body.toString(), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

}
