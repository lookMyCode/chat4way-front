import { HttpClient } from '@angular/common/http';
import { BasicService } from './../basic.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-ajax',
  templateUrl: './chat-ajax.component.html',
  styleUrls: ['./chat-ajax.component.scss']
})
export class ChatAjaxComponent implements OnInit, OnDestroy {
  declare id: number;
  messages: any[] = [];
  declare interval: number;
  declare myId: number;
  message: string = '';

  constructor(
    private basic: BasicService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.myId = this.basic.getId();
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((p: any) => {
        if (!p?.id) return;

        this.id = +p.id;
        this.getPage();

        this.interval = window.setInterval(this.getPage.bind(this), 2000);
      });
  }

  getPage() {
    this.http.post(`${this.basic.getBaseUrl()}/messages`, {id: this.id})
      .subscribe((res: any) => {
        this.messages = res as any[];
      });
  }

  getDate(ts: string): string {
    const date = new Date(+ts);

    const d = date.getDate();
    const M = date.getMonth() + 1;
    const y = date.getFullYear();
    const m = date.getMinutes();
    const h = date.getHours();

    const dd = ('' + d).length === 2 ? d : '0' + d;
    const MM = ('' + M).length === 2 ? M : '0' + M;
    const mm = ('' + m).length === 2 ? m : '0' + m;
    const hh = ('' + h).length === 2 ? h : '0' + h;

    return `${hh}:${mm} ${dd}.${MM}.${y}`;
  }

  sendMessage() {
    const req = {
      autor_id: this.basic.getId(),
      room_id: this.id,
      message: this.message
    }

    this.http.post(`${this.basic.getBaseUrl()}/send-message`, req)
      .subscribe(() => {
        this.message = '';
        this.getPage();
      });
  }

  ngOnDestroy() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }
}