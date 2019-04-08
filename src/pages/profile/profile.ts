import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Keyboard} from "@ionic-native/keyboard";
import {getBalance} from "../../configs/balance";
import {Http} from "@angular/http";
import {GLOBAL_CONFIG} from "../../configs/url";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userName: string;
  balance: any;
  outputBalance: number;
  response: any;
  constructor(
    public keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {
    this.userName = localStorage.getItem("user_name");
    this.balance = getBalance();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  outputMoney() {

    if (+this.outputBalance > +getBalance() || +getBalance() == 0) {
      this.outputBalance = 0;
      swal("Ошибка", "На вашем балансе недостаточно средств", "error");
      return 0;
    }

    if (this.outputBalance < 0) {
      swal("Ошибка", "Введенная сумма некоректна", "error");
      this.outputBalance = 0;
      return 0;
    }

    let user_id = localStorage.getItem("user_id");
    this.http.get(GLOBAL_CONFIG.url + 'api/cashOut.php?id=' + user_id + '&out=' + this.outputBalance)
      .subscribe(data => {
        this.response = data;
        this.response = JSON.parse(this.response._body);
        if(this.response.error){
          swal("Ошибка", this.response.error, "error");
          return 0;
        }
        if(this.response.success){
          swal("", this.response.success, "success");
          this.balance -= this.outputBalance;
          localStorage.setItem("current_balance", this.balance);
        }
    })
  }


  getFocus() {
    let el = document.querySelector('.profile__img');
    el.classList.toggle('d-none');
  }

}
