import { Component, OnInit } from '@angular/core';
import { Account } from '../_domain/account';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts: Account[];
  selectedAccount: Account;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getAccounts();
  }

  onSelect(account: Account): void {
    this.selectedAccount = account;
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }
}
