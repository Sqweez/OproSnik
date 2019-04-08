import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {OneSignal} from "@ionic-native/onesignal";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    // splashScreen: SplashScreen,
    public oneSignal: OneSignal) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(false);
      //splashScreen.hide();

      if (platform.is('cordova')) {
        this.oneSignal
          .startInit("bacb690c-e0de-404f-96af-ab10eda3721f", "669362346677")
          .endInit();

        this.oneSignal.getIds().then(data => {
          let ids = data;
          let push = ids.userId;
          localStorage.setItem("push", push);
        });
      }

      if (localStorage.getItem("user_name")) {
        this.rootPage = "HomePage";
      }
      else {
        this.rootPage = "SliderPage";
      }
    });
  }
}
