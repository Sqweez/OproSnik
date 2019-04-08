import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  InAppBrowser
} from "@ionic-native/in-app-browser";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";
import swal from 'sweetalert';
import {
  Http
} from "@angular/http";
import {
  getBalance
} from "../../configs/balance";

/**
 * Generated class for the PollPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html',
})
export class PollPage {
  count = 0;
  images = 'http://spv.kz/images/Clip.png';
  questionPic = 'http://spv.kz/images/question_pic.png';
  question: any;
  answerRadio: any;
  answers: any;
  length: number;
  answered_questions = [];
  color: any;
  balance: any;
  advert: any;

  constructor(
    public inAppBrowser: InAppBrowser,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public nativePageTransitions: NativePageTransitions) {
    this.balance = getBalance();
    this.count = this.navParams.get("count");
    let q = JSON.parse(localStorage.getItem("questions"));
    this.color = this.navParams.get("color");
    this.advert = JSON.parse(this.navParams.get("advert"));
    if (!this.count) {
      this.count = 0;
    }
    this.length = q.length;
    this.question = q[this.count].question;
    this.answers = JSON.parse(q[this.count].question.answers);
    if (localStorage.getItem("answered_questions")) {
      this.answered_questions = JSON.parse(localStorage.getItem("answered_questions"));
    }
  }

  bannerClickedEvent(url) {
    this.inAppBrowser.create(url, "_system");
  }

  nextQuestion(item) {
    ++this.count;
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 200,
      slowdownfactor: -1
    };


    if ((item !== 0) && !this.answerRadio) {
      swal("Ошибка!", "Пожалуйста, выберите вариант ответа", "error");
      return 0;
    }

    if (item === 0) {
      this.answered_questions.push({
        question_id: this.question.id,
        answer_id: 0
      });
    } else {
      this.answered_questions.push({
        question_id: this.question.id,
        answer_id: this.answerRadio
      });
    }
    localStorage.setItem("answered_questions", JSON.stringify(this.answered_questions));
    if (this.count < this.length) {
      this.nativePageTransitions.slide(options).then(data => {

      })
      this.navCtrl.setRoot("PollPage", {
        count: this.count,
        color: this.color,
        advert: JSON.stringify(this.advert)
      });
    } else {
      localStorage.removeItem("questions");
      let url = 'http://polls.controlsoft.kz/api/poll.php';
      let formData = new FormData();
      formData.append("answers", JSON.stringify(this.answered_questions));
      formData.append("user_id", localStorage.getItem("user_id"));
      localStorage.removeItem("answered_questions");
      this.http.post(url, formData).subscribe(data => {
        this.nativePageTransitions.slide(options).then(data => {

        })
        this.navCtrl.setRoot("PollFinishPage")
      })
    }
  }
}
