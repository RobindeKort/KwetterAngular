import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../_service/authentication.service';
import {Router} from '@angular/router';
import {AccountService} from '../_service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthenticationService,
              private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe(
        data => {
          this.accountService.updateLoggedIn();
          console.log('User is logged in');
          this.router.navigateByUrl('/dashboard');
        },
        error => {
          this.loading = false;
        }
      );
  }
}
