import { Component } from '@angular/core';
import { NavController, ViewController, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { UserServiceProvider } from "../../../providers/biz/user-service";

/**
 * 找回密码
 */
@IonicPage()
@Component({
  selector: 'page-find-password',
  templateUrl: 'find-password.html'
})
export class FindPasswordPage {

  findPasswordForm: any;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder, private userservices: UserServiceProvider
  ) {

    // 构造表单
    this.findPasswordForm = this.formBuilder.group({
      phone: [, [Validators.required, Validators.minLength(11), Validators.pattern('1[0-9]{10}')]],
      verificationCode: [, [Validators.required, Validators.minLength(6), Validators.pattern('[0-9]{6}')]],
      newPassword: [, [Validators.required, Validators.minLength(6)]],
      secnewPassword: [, [Validators.required, Validators.minLength(6)]],
    });

  };

  // 确认
  confirm() {
    this.userservices.changePassword({}).subscribe(data => {
    });
  }

  // 关闭
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
