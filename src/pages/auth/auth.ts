import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {Keyboard} from "@ionic-native/keyboard";
import {User} from "../../models/user";
import {Http} from "@angular/http";
import swal from 'sweetalert';

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  beforeSMS: boolean = true;
  user = {} as User;
  formData: FormData;
  response: any;
  pass: number;

  constructor(
    public keyboard: Keyboard,
    private native: NativePageTransitions,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

  auth() {
    let url = 'http://polls.controlsoft.kz/api/register.php';
    if (this.beforeSMS) {
      this.user.phone = "+7" + this.user.phone.slice(1);
      this.formData = new FormData();
      this.formData.append("phone", this.user.phone);
      this.formData.append("action", "auth");
      this.formData.append("push", localStorage.getItem("push"));
      this.http.post(url, this.formData).subscribe(data => {
        this.response = data;
        this.response = this.response._body;
        this.response = JSON.parse(this.response);
        console.log(this.response);
        if (this.response.error) {
          swal("Ошибка!", `${this.response.error}`, "error");
          return 0;
        }
        this.http.get('https://api.mobizon.kz/service/message/sendsmsmessage?recipient=' + this.user.phone + '&text=Код потверждения для SmartОпроса: ' + this.response.pass + '&apiKey=kz4f23285577ca032ca69150a6fd7378d04a8da887e3e6dc06393bdbfa446185e0d961').subscribe(data => {
        });
        this.beforeSMS = false;
        return 0;
      })
      return 0;
    }
    if (this.response.pass != this.user.confirmCode) {
      swal("Ошибка!", `Введенный код подтверждения не совпадает с отправленным по SMS`, "error");
      return 0;
    }
    localStorage.setItem("user_id", this.response.user_id);
    localStorage.setItem("user_name", this.response.name);
    this.navCtrl.setRoot("HomePage");
  }

  goToRegistraion() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 200,
      slowdownfactor: -1
    };

    this.native.slide(options).then(() => {
      this.navCtrl.push("RegisterPage");
    });
  }

}
