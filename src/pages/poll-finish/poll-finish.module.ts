import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PollFinishPage} from "./poll-finish";

@NgModule({
  declarations: [
    PollFinishPage,
  ],
  imports: [
    IonicPageModule.forChild(PollFinishPage),
  ],
  exports: [
    PollFinishPage
  ]
})
export class PollFinishModule {}
