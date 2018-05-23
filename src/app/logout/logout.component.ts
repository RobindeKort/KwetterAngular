import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {AccountService} from '../_service/account.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private cookieService: CookieService,
              private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit() {
    this.cookieService.remove('access_token', {path: '/Kwetter/api/'});
    this.accountService.updateLoggedIn();
    this.router.navigateByUrl('/');
  }
}
