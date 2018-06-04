import {Injectable} from '@angular/core';
import {Kweet} from '../_domain/kweet';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SearchService {
  private searchUrl = 'http://localhost:8080/Kwetter/api/search/';

  constructor(private http: HttpClient) {
  }

  searchKweets(body: string): Observable<Kweet[]> {
    // return of(ACCOUNTS);
    const newUrl = this.searchUrl + body;
    // console.log(newUrl);
    return this.http.get<Kweet[]>(newUrl);
  }

}
