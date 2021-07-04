import { ChatWsComponent } from './chat-ws/chat-ws.component';
import { ChatEsComponent } from './chat-es/chat-es.component';
import { ChatLpComponent } from './chat-lp/chat-lp.component';
import { ChatAjaxComponent } from './chat-ajax/chat-ajax.component';
import { DialoguesComponent } from './dialogues/dialogues.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'users', component: UserListComponent},
  {path: 'dialogues', component: DialoguesComponent},
  {path: 'chat-ajax/:id', component: ChatAjaxComponent},
  {path: 'chat-lp/:id', component: ChatLpComponent},
  {path: 'chat-es/:id', component: ChatEsComponent},
  {path: 'chat-ws/:id', component: ChatWsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}