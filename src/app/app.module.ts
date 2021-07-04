import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { UserListComponent } from './user-list/user-list.component';
import { DialoguesComponent } from './dialogues/dialogues.component';
import { ChatAjaxComponent } from './chat-ajax/chat-ajax.component';
import { ChatEsComponent } from './chat-es/chat-es.component';
import { ChatWsComponent } from './chat-ws/chat-ws.component';
import { ChatLpComponent } from './chat-lp/chat-lp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserListComponent,
    DialoguesComponent,
    ChatAjaxComponent,
    ChatEsComponent,
    ChatWsComponent,
    ChatLpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}