import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicService } from '../basic.service';

@Component({
  selector: 'app-chat-es',
  templateUrl: './chat-es.component.html',
  styleUrls: ['./chat-es.component.scss']
})
export class ChatEsComponent implements OnInit {
  declare id: number;
  messages: any[] = [];
  declare myId: number;
  message: string = '';

  constructor(
    private basic: BasicService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef
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
    const eventSourcing: EventSource = new EventSource(`${this.basic.getBaseUrl()}/messages-es/${this.id}`);
    const cb = (e: any) => {
      const messages = JSON.parse(e.data) as any[];
      this.messages = messages.map(m => m);
      this.cdref.detectChanges();
    }

    eventSourcing.onmessage = cb.bind(this);
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

    this.http.post(`${this.basic.getBaseUrl()}/send-message-es`, req)
      .subscribe(() => {
        this.message = '';
      });
  }

  ngOnDestroy() {

  }
}