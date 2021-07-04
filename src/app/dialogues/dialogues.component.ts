import { BasicService } from './../basic.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogues',
  templateUrl: './dialogues.component.html',
  styleUrls: ['./dialogues.component.scss']
})
export class DialoguesComponent implements OnInit, OnDestroy {
  list: any[] = [];
  declare interval: number;

  constructor(
    private http: HttpClient,
    private basic: BasicService
  ) {}

  ngOnInit(): void {
    this.getPage();

    this.interval = window.setInterval(this.getPage.bind(this), 5000);
  }

  getPage() {
    this.http.post(`${this.basic.getBaseUrl()}/dialogues`, {id: this.basic.getId()})
      .subscribe((res: any) => {
        this.list = res as any[];
      });
  }

  ngOnDestroy() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }
}