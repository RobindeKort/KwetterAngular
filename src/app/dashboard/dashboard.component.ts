import {Component, OnInit} from '@angular/core';
import {Kweet} from '../_domain/kweet';
import {AccountService} from '../_service/account.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  kweetForm = new FormGroup({
    body: new FormControl()
  });
  kweets: Kweet[];
  selectedKweet: Kweet;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.getKweets();
  }

  postKweet(): void {
    this.loading = true;
    this.accountService.postKweet(this.kweetForm.get('body').value)
      .subscribe(
        data => {
          console.log('Kweet has been sent');
          this.loading = false;
        },
        error => {
          // TODO robkor: show error notification
          this.loading = false;
        }
      );
  }

  onSelect(kweet: Kweet): void {
    this.selectedKweet = kweet;
  }

  getKweets(): void {
    // const userName = this.accountService.loggedInAccount.userName;
    this.accountService.getFollowingKweets()
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
}
