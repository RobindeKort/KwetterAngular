import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private authUrl = 'http://localhost:8080/Kwetter/api/auth';

  constructor(private http: HttpClient) {
  }

  login(formInput: string) {
    return this.http.post<Account>(this.authUrl, {formInput}, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

}
