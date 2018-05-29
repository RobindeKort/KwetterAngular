import {Component, OnInit, OnDestroy} from '@angular/core';
import {Account} from '../_domain/account';
import {AccountService} from '../_service/account.service';
import {Kweet} from '../_domain/kweet';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  sub: any;
  userName: string;
  kweets: Kweet[];
  selectedKweet: Kweet;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userName = params['userName'];
      this.getKweets();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelect(kweet: Kweet): void {
    this.selectedKweet = kweet;
  }

  getKweets(): void {
    this.accountService.getKweets(this.userName)
      .subscribe(kweets => {
        this.kweets = kweets;
        if (kweets === null) {
          // TODO robkor: handle this
        }
      });
  }
}
