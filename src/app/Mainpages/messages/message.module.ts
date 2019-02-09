import { StarRatingModule } from 'angular-star-rating';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './message-list.component';
import { MessageComponent } from './message.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../../material-module';
import { MessageLinkComponent } from './messagelink.component';
import { MessageRouting } from './message.route';
@NgModule({
  declarations: [ MessageListComponent, MessageComponent, MessageLinkComponent ],
  imports: [ StarRatingModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FormsModule,
  MessageRouting ],
  providers: []


})

export class MessageModule {

}
