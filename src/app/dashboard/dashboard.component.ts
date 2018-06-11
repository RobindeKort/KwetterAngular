import {Component, OnInit} from '@angular/core';
import {Account} from '../_domain/account';
import {Kweet} from '../_domain/kweet';
import {AccountService} from '../_service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {TimelineService} from '../_service/timeline.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInAccount: Account = new Account('', '', '');
  following: Account[];
  followedBy: Account[];
  kweetForm: FormGroup = new FormGroup({
    body: new FormControl()
  });
  loading: Boolean = false;
  kweets: Kweet[];
  selectedKweet: Kweet;

  constructor(private accountService: AccountService,
              private timelineService: TimelineService,
              private router: Router) {
  }

  ngOnInit() {
    this.accountService.getLoggedIn()
      .subscribe(
        data => {
          this.loggedInAccount = data;
          this.getFollowing();
          this.getFollowedBy();
          this.getKweets();
          this.subscribeKweets();
        },
        error => this.router.navigateByUrl('/')
      );
  }

  getFollowing(): void {
    this.accountService.getFollowing(this.loggedInAccount.userName)
      .subscribe(following => {
        this.following = following;
        if (following === null) {
          // TODO robkor: handle this
        }
      });
  }

  getFollowedBy(): void {
    this.accountService.getFollowedBy(this.loggedInAccount.userName)
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

  postKweet(): void {
    this.loading = true;
    this.accountService.postKweet(this.kweetForm.get('body').value)
      .subscribe(
        data => {
          this.timelineService.messages.next(data);
          console.log('Kweet has been sent');
          this.loading = false;
        },
        error => {
          // TODO robkor: show error notification
          this.loading = false;
        }
      );
  }

  getKweets(): void {
    // const userName = this.accountService.account.userName;
    this.accountService.getFollowingKweets(this.loggedInAccount.userName)
      .subscribe(kweets => {
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

  subscribeKweets(): void {
    this.timelineService.subscribe(this.loggedInAccount.userName);
    this.timelineService.messages.subscribe(
      msg => {
        this.kweets.unshift(msg);
      }
    );
  }

  onSelectKweet(kweet: Kweet): void {
    this.selectedKweet = kweet;
  }
}
