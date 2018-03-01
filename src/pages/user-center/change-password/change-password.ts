import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeService } from "../../../providers/NativeService";
import { GlobalData } from "../../../providers/GlobalData";
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from "../../../providers/biz/user-service";
/**
 * 修改密码
 */
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  newpassword;

  public params = {
    srcPwd: '',
    newPwd: '',
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserServiceProvider,
    private nativeService: NativeService, public storage: Storage, private globalData: GlobalData, public alertCtrl: AlertController
  ) { }

  // 保存
  save() {
    console.log(this.params);
    console.log(this.newpassword);
    if (this.params.newPwd == this.newpassword) {
      let alert = this.alertCtrl.create({
        title: '否确定保存,修改后需要重新登录?',
        buttons: [
          {
            text: '否',
            handler: () => {
            }
          },
          {
            text: '是',
            handler: () => {
              this.userService.changePassword(this.params).subscribe(data => {
                this.nativeService.showToast('密码修改成功');
                this.storage.set("token", '');
                this.globalData.token = '';
                this.userService.logout().then(() => {
                  this.navCtrl.remove(2);
                  this.navCtrl.remove(1);
                  this.navCtrl.push("LoginPage");
                });
              });
            }
          }
        ]
      });
      alert.present();
    } else {
      this.nativeService.showToast('两次输入密码不一致');
    }
  }


}
