import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicService } from '../basic.service';

@Component({
  selector: 'app-chat-lp',
  templateUrl: './chat-lp.component.html',
  styleUrls: ['./chat-lp.component.scss']
})
export class ChatLpComponent implements OnInit {
  declare id: number;
  messages: any[] = [];
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
        this.getData();
        this.getPage();
      });
  }

  getData() {
    this.http.post(`${this.basic.getBaseUrl()}/messages`, {id: this.id})
      .subscribe((res: any) => {
        this.messages = res as any[];
      });
  }

  getPage() {
    this.http.post(`${this.basic.getBaseUrl()}/messages-lp`, {id: this.id})
      .subscribe((res: any) => {
        this.messages = res as any[];
        this.getPage();
      }, _ => {
        window.setTimeout(this.getPage.bind(this), 500);
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

    this.http.post(`${this.basic.getBaseUrl()}/send-message-lp`, req)
      .subscribe(() => {
        this.message = '';
      });
  }

  ngOnDestroy() {

  }
}