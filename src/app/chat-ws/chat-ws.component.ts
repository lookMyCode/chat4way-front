import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicService } from '../basic.service';

@Component({
  selector: 'app-chat-ws',
  templateUrl: './chat-ws.component.html',
  styleUrls: ['./chat-ws.component.scss']
})
export class ChatWsComponent implements OnInit {
  declare id: number;
  messages: any[] = [];
  declare myId: number;
  message: string = '';
  declare socket: WebSocket;
  connected: boolean = false;

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
        this.connect();
      });
  }

  connect() {
    this.socket = new WebSocket('ws://localhost:3001/2');

    this.socket.onopen = () => {
      this.connected = true;
    }

    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onerror = this.onError.bind(this);
  }

  onOpen() {
    console.log('onOpen');
    this.connected = true;

    const message = {
      event: 'connection',
      room_id: this.id
    }

    this.socket.send(JSON.stringify(message));
  }

  onMessage(e: any) {
    console.log('onMessage');
    this.messages = JSON.parse(e.data);
  }

  onClose() {
    console.log('onClose');
  } 

  onError() {
    console.log('onError');
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
    const message = {
      event: 'message',
      room_id: this.id,
      data: {
        autor_id: this.basic.getId(),
        room_id: this.id,
        message: this.message
      }
    }

    this.socket.send(JSON.stringify(message));
    this.message = '';
  }

  ngOnDestroy() {
    this.socket.close();
  }
}