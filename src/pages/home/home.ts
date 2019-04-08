import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {Http} from "@angular/http";
import swal from 'sweetalert';
import {GLOBAL_CONFIG} from "../../configs/url";
import {SplashScreen} from "@ionic-native/splash-screen";
import {getColor} from "../../configs/colors";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  response: any;
  balanceS: any;

  constructor(
    public navCtrl: NavController,
    public native: NativePageTransitions,
    public http: Http,
    public splashScreen: SplashScreen) {

    this.http.get(GLOBAL_CONFIG.url + 'api/getBalance.php?id=' + localStorage.getItem("user_id"))
      .subscribe(data => {
        this.balanceS = data;
        this.balanceS = this.balanceS._body;
        console.log(this.balanceS);
        localStorage.setItem("current_balance", this.balanceS);
        this.splashScreen.hide()
    });

  }

  pushToPage() {
    this.navCtrl.push("SliderPage");
  }

  opros() {
    /*    let options: NativeTransitionOptions = {
          direction: 'left',
          duration: 200,
          slowdownfactor: -1
        };
        this.native.slide(options).then(() => {
          this.navCtrl.setRoot("PollPage");
        })*/
    let url = GLOBAL_CONFIG.url + 'api/get.php?action=getQuestions&user_id=' + localStorage.getItem("user_id");
    this.http.get(url).subscribe(data => {
      this.response = data;
      console.log(data);
      this.response = this.response._body;
      if (JSON.parse(this.response).length === 0) {
        swal("Извините!", "На данный момент нет доступных для вас опросов, попробуйте позднее", "error");
        return 0;
      }
      localStorage.setItem("questions", this.response);
      this.http.get(GLOBAL_CONFIG.url + 'api/getAdvertising.php?user_id=' + localStorage.getItem("user_id")).subscribe(data => {
        this.response = data;
        this.response = this.response._body;
        this.navCtrl.setRoot("PollPage", {color: getColor(), advert: this.response})
      })
    })
    //this.navCtrl.setRoot("PollPage");

  }
}
