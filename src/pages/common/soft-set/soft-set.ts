import { ChangeDetectorRef, Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalData } from "../../../providers/GlobalData";
import { UserServiceProvider } from "../../../providers/biz/user-service";
/**
 * 软件设置
 */

@IonicPage()
@Component({
  selector: 'page-soft-set',
  templateUrl: 'soft-set.html',
})
export class SoftSetPage {

  constructor(public navCtrl: NavController, private userService: UserServiceProvider, public storage: Storage, public navParams: NavParams, public cd: ChangeDetectorRef, public alertCtrl: AlertController, private globalData: GlobalData) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoftSetPage');
  }

  // 退出登录
  logout() {
    let alert = this.alertCtrl.create({
      title: '确定退出登录吗?',
      buttons: [
        {
          text: '否',
          handler: () => {
          }
        },
        {
          text: '是',
          handler: () => {
            this.storage.set("token", '');
            this.globalData.token = '';
            this.userService.logout().then(() => {
              this.navCtrl.push('LoginPage');
            });
          }
        }
      ]
    });
    alert.present();
  }



}
