import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import * as $ from 'jquery';
import {NativeTransitionOptions, NativePageTransitions} from "@ionic-native/native-page-transitions";
import {Http} from "@angular/http";
import {GLOBAL_CONFIG} from "../../configs/url";
import {SplashScreen} from "@ionic-native/splash-screen";

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {
  @ViewChild(Slides) slides: Slides;
  images = [];
  response: any;
  constructor(
    public sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public navParams: NavParams,
    private native: NativePageTransitions,
    public http: Http,
    public splashScreen: SplashScreen) {
    this.http.get(GLOBAL_CONFIG.url + 'api/getSlides.php').subscribe(data => {
      this.response = data;
      this.response = JSON.parse(this.response._body);
      Object.keys(this.response).forEach(item => {
        let pic = this.response[item];
        this.images.push(pic);
      });
      this.splashScreen.hide();
    })
  }


  ionViewDidEnter() {
  }

  slideChanged() {
    let button = $('.slider-button__continue > span');
    let skip__button = $('.slider-button__skip');
    if (this.slides.getActiveIndex() >= (this.images.length - 1)) {
      skip__button.addClass("d-none");
      button.html('Начать!');
    }
    else {
      skip__button.removeClass('d-none');
      button.html('Далее');
    }
  }

  moveSlides() {
    if (this.slides.getActiveIndex() >= (this.images.length - 1)) {
      this.navCtrl.setRoot("RegisterPage");

      return 0;
    }
    this.slides.slideNext();
  }
}
