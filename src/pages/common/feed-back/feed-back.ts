import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UserServiceProvider } from "../../../providers/biz/user-service";
import { NativeService } from "../../../providers/NativeService";

/**
 * 意见反馈
 */
@IonicPage()
@Component({
  selector: 'page-feed-back',
  templateUrl: 'feed-back.html',
})
export class FeedBackPage {
  params = { content: "", title: "" };
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider, private nativeService: NativeService, ) {
  }

  ionViewDidLoad() {
  }
  save() {
    console.log(this.params);

    this.userService.feedback(this.params).subscribe(data => {
      this.nativeService.showToast('意见反馈成功');
      this.navCtrl.pop();
    })
  }

}
