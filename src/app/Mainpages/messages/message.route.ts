
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageListComponent } from './message-list.component';
import { MessageComponent } from './message.component';
import { MessageLinkComponent } from './messagelink.component';

const MESSAGE_ROUTE : Routes = [
 { path: '', component: MessageLinkComponent , children: [
        { path: 'reviewlist', component: MessageListComponent },
        { path: 'edit/:id', component: MessageComponent },
        { path: 'create', component: MessageComponent}
 ] }
];


@NgModule({
    imports: [
      RouterModule.forChild(MESSAGE_ROUTE)
    ],
    exports: [RouterModule]
})
  
  export class MessageRouting {}
  