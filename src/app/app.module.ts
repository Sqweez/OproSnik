import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {NativePageTransitions} from "@ionic-native/native-page-transitions/";
import {Keyboard} from "@ionic-native/keyboard";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Http, HttpModule} from "@angular/http";
import {OneSignal} from "@ionic-native/onesignal";
import {PollPage} from "../pages/poll/poll";
import {PollFinishPage} from "../pages/poll-finish/poll-finish";
import {ProfilePage} from "../pages/profile/profile";
import {RegisterPage} from "../pages/register/register";
import {SliderPage} from "../pages/slider/slider";
import {AuthPage} from "../pages/auth/auth";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PollPage,
    PollFinishPage,
    ProfilePage,
    RegisterPage,
    SliderPage,
    AuthPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: true,
      autoFocusAssist: true,
      scrollPadding: false
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    Keyboard,
    OneSignal,
    InAppBrowser
  ]
})
export class AppModule {}
