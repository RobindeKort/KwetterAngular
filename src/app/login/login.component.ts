import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../_service/authentication.service';
import {Router} from '@angular/router';

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
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe(
        data => {
          localStorage.setItem('loggedInAccount', JSON.stringify(data));
          console.log('User is logged in');
          this.router.navigateByUrl('/');
        },
        error => {
          this.loading = false;
        }
      );
  }
}
