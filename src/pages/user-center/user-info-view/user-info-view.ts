import { ChangeDetectorRef, Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { NativeService } from '../../../providers/NativeService';
import { UserServiceProvider } from '../../../providers/biz/user-service';
import { DatePipe } from "@angular/common";
import { StorageKVService } from "../../../providers/StorageKVService";
import { APP_SERVE_URL } from "../../../providers/Constants";
import { ImgService } from "../../../providers/ImgService";

/**
 * 个人信息查看
 */
@IonicPage()
@Component({
  selector: 'page-user-info-view',
  templateUrl: 'user-info-view.html',
})
export class UserInfoViewPage {

  private userinfo = {
    birthDate: '',
    sex: '',
    telphone: '',
    nickName: '',
    avatorFileId: '',
  };
  private user;
  private KEY_USERINFO = "userinfo";
  imgavter;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private nativeService: NativeService,
    private kv: StorageKVService,
    private imgSer: ImgService,
    private userService: UserServiceProvider, private datePipe: DatePipe, public cd: ChangeDetectorRef) { }

  ionViewDidLoad() {
    this.user = this.navParams.get('item');
    this.userinfo.birthDate = this.datePipe.transform(this.user.birthDate, 'yyyy-MM-dd');;
    this.userinfo.sex = this.user.sex;
    this.userinfo.telphone = this.user.telphone;
    this.userinfo.nickName = this.user.nickName;
    if (this.user.avatorFileId) {
      this.imgavter = APP_SERVE_URL + 'file/download/' + this.user.avatorFileId;
    }
  }

  // 修改用户信息
  save() {
    this.user.birthDate = this.userinfo.birthDate;
    this.user.sex = this.userinfo.sex;
    this.user.telphone = this.userinfo.telphone;
    this.user.nickName = this.userinfo.nickName;
    this.user.avatorFileId = this.userinfo.avatorFileId;
    this.userService.editUserinfo(this.userinfo).subscribe(data => {
      this.nativeService.showToast('个人资料修改成功');
      this.kv.set(this.KEY_USERINFO, this.user).then(() => {
      })
    });
  }

  //获取图片方式（相册、拍照）
  takePhoto() {
    // 初始化上传图片的服务
    this.imgSer.upload.url = APP_SERVE_URL + 'file/upload'; // 上传图片的url，如果同默认配置的url一致，那无须再设置
    this.imgSer.upload.success = (data) => {
      if (JSON.parse(data.response).fileId) {
        this.nativeService.showToast('上传成功');
        this.userinfo.avatorFileId = JSON.parse(data.response).fileId;
        this.user.avatorFileId = this.userinfo.avatorFileId;
        this.imgavter = APP_SERVE_URL + 'file/download/' + this.user.avatorFileId;
        this.userService.editUserinfo(this.userinfo).subscribe(data => {
          this.kv.set(this.KEY_USERINFO, this.user).then(() => {
          })
        });
      } else {
        this.nativeService.showToast('上传失败');
      }
    };
    this.imgSer.upload.error = (err) => {
      this.nativeService.showToast('上传失败');
    };
    this.imgSer.showPicActionSheet();
  }

  // 选择性别
  sexActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择性别',
      buttons: [
        {
          text: '男',
          role: 'destructive',
          handler: () => {
            this.userinfo.sex = '男';
          }
        }, {
          text: '女',
          handler: () => {
            this.userinfo.sex = '女';
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
}
