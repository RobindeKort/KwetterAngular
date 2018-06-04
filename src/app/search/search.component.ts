import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Kweet} from '../_domain/kweet';
import {SearchService} from '../_service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  sub: any;
  query: string;
  kweets: Kweet[];
  selectedKweet: Kweet;

  constructor(private searchService: SearchService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.query = params['query'];
      this.updateSearch();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private updateSearch(): void {
    this.searchService.searchKweets(this.query)
      .subscribe(
        kweets => {
          this.kweets = kweets.sort((a, b) => {
            if (b.datePosted < a.datePosted) {
              return -1;
            } else if (b.datePosted > a.datePosted) {
              return 1;
            } else {
              return 0;
            }
          });
          if (kweets === null) {
            // TODO robkor: handle this
          }
        });
  }

  onSelectKweet(kweet: Kweet): void {
    this.selectedKweet = kweet;
  }
}
