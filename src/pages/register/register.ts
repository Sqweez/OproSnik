import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {Keyboard} from "@ionic-native/keyboard";
import {User} from "../../models/user";
import {Http} from "@angular/http";
import swal from 'sweetalert';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  beforeSMS = true;
  user = {} as User;
  response: any;
  userData;
  confirmCode;

  constructor(
    public keyboard: Keyboard,
    public native: NativePageTransitions,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    let url = 'http://polls.controlsoft.kz/api/register.php';
    if (this.beforeSMS) {

      this.user.phone = '+7' + this.user.phone.slice(1);

      this.userData = new FormData();

      this.userData.append("phone", this.user.phone);
      this.userData.append("name", this.user.name);
      this.userData.append("action", "register");
      this.userData.append("birthDate", this.user.birthDate.toString());
      this.userData.append("push", localStorage.getItem("push"));
      this.userData.append("gender", this.user.gender);

      this.http.post(url, this.userData).subscribe(data => {
        this.response = data;
        this.response = JSON.parse(this.response._body);
        if (this.response.error) {
          swal("Ошибка!", `${this.response.error}`, "error");
          return 0;
        }
        this.confirmCode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        this.http.get('https://api.mobizon.kz/service/message/sendsmsmessage?recipient=' + this.user.phone + '&text=Код потверждения для SmartОпроса: ' + this.confirmCode + '&apiKey=kz4f23285577ca032ca69150a6fd7378d04a8da887e3e6dc06393bdbfa446185e0d961').subscribe(data => {
        });
        this.userData.append("pass", this.confirmCode);
        this.beforeSMS = false;
      });
      return 0;
    }

    if (!this.user.confirmCode == this.confirmCode) {
      swal("Ошибка!", `Введенный код подтверждения не совпадает с отправленным по SMS`, "error");
      return 0;
    }
    this.http.post(url, this.userData).subscribe(data => {
      this.response = data;
      this.response = JSON.parse(this.response._body);
      localStorage.setItem("user_name", this.response.name);
      localStorage.setItem("user_id", this.response.user_id);
      this.navCtrl.setRoot("HomePage");
    });

  }

  goToAuth() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 200,
      slowdownfactor: -1
    }

    this.native.slide(options).then(_ => {
    });
    this.navCtrl.setRoot("AuthPage");


  }


}
