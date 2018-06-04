import {Component, OnInit, OnDestroy} from '@angular/core';
import {Account} from '../_domain/account';
import {AccountService} from '../_service/account.service';
import {Kweet} from '../_domain/kweet';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  sub: any;
  userName: string;
  account: Account = new Account('', '', '');
  following: Account[];
  followedBy: Account[];
  kweets: Kweet[];
  selectedKweet: Kweet;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userName = params['userName'];
      this.updateLoggedIn();
      this.getFollowing();
      this.getFollowedBy();
      this.getKweets();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private updateLoggedIn(): void {
    this.accountService.getAccount(this.userName)
      .subscribe(
        data => this.account = data
      );
  }

  getFollowing(): void {
    this.accountService.getFollowing(this.userName)
      .subscribe(following => {
        this.following = following;
        if (following === null) {
          // TODO robkor: handle this
        }
      });
  }

  getFollowedBy(): void {
    this.accountService.getFollowedBy(this.userName)
      .subscribe(followedBy => {
        this.followedBy = followedBy;
        if (followedBy === null) {
          // TODO robkor: handle this
        }
      });
  }

  onSelectAccount(account: Account): void {
    this.router.navigateByUrl('/users/' + account.userName);
  }

  getKweets(): void {
    this.accountService.getKweets(this.userName)
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
