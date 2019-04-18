import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {getBalance} from "../../configs/balance";

/**
 * Generated class for the PollFinishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poll-finish',
  templateUrl: 'poll-finish.html',
})
export class PollFinishPage {

  private balance: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.balance = getBalance();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollFinishPage');
  }

}
