import { BasicService } from './../basic.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  login: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private basic: BasicService
  ) {}

  ngOnInit(): void {}

  auth() {
    this.http.post(`${this.basic.getBaseUrl()}/auth`, {login: this.login})
      .subscribe((res: any) => {
        this.basic.setId(+res);
        this.router.navigate(['/users']);
      });
  }
}