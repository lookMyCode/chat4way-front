import { BasicService } from './../basic.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private basic: BasicService
  ) {}

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.http.post(`${this.basic.getBaseUrl()}/users`, {id: this.basic.getId()})
      .subscribe((res: any) => {
        this.users = res as any[];
      });
  }

  contact(type: string, id: number) {
    const req = {
      my_id: this.basic.getId(),
      target_id: id
    }

    this.http.post(`${this.basic.getBaseUrl()}/room-id`, req)
      .subscribe((res: any) => {
        this.router.navigate(['/' + type, res as string]);
      });
  }
}