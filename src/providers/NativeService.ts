import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import {
  ToastController,
  Loading,
  LoadingController,
  Platform,
  AlertController
} from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { File, FileEntry } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ImagePicker } from '@ionic-native/image-picker';
import { Network } from '@ionic-native/network';
import { AppMinimize } from "@ionic-native/app-minimize";

import {
  APP_DOWNLOAD,
  APK_DOWNLOAD,
  REQUEST_TIMEOUT,
  APP_VERSION_SERVE_URL
} from "./Constants";
import { GlobalData } from "./GlobalData";
import { Observable } from "rxjs";

// 百度地图-位置
declare var baidumap_location;

/**
 * 原生功能调用服务
 */
@Injectable()
export class NativeService {

  // 加载状态
  private loading: Loading;
  // 是否正在加载
  private loadingIsOpen: boolean = false;

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private appVersion: AppVersion,
    private camera: Camera,
    private toast: Toast,
    private transfer: FileTransfer,
    private file: File,
    private inAppBrowser: InAppBrowser,
    private imagePicker: ImagePicker,
    private network: Network,
    private appMinimize: AppMinimize,
    private loadingCtrl: LoadingController,
    private globalData: GlobalData,
    private http: Http) {

  }

  /**
   * 使用默认状态栏
   */
  statusBarStyleDefault(): void {
    this.statusBar.styleDefault();
  }

  /**
   * 隐藏启动页面
   */
  splashScreenHide(): void {
    this.splashScreen.hide();
  }

  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 判断是否有网络
   */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }

  /**
   * 调用最小化app插件
   */
  minimize(): void {
    this.appMinimize.minimize()
  }

  /**
   * 通过浏览器打开url
   */
  openUrlByBrowser(url: string): void {
    this.inAppBrowser.create(url, '_system');
  }

  /**
   * 检查app是否需要升级
   */
  detectionUpgrade(): void {
    if (this.isMobile()) {
      // 获得app包名
      this.getPackageName().subscribe(packageName => {
        let appName = packageName.substring(packageName.lastIndexOf('.') + 1);
        let appType = this.isAndroid() ? 'android' : 'ios';
        // 从后台查询app最新版本信息
        this.http.get(`${APP_VERSION_SERVE_URL}app/${appName}/${appType}/latest/version`)
          .map((res: Response) => res.json())
          .subscribe(res => {
            //获得当前app版本
            this.getVersionNumber().subscribe(currentNo => {
              if (currentNo != res.version) {//比较版本号
                if (res.isForcedUpdate == 1) {//判断是否强制更新
                  this.alertCtrl.create({
                    title: '重要升级',
                    subTitle: '您必须升级后才能使用！',
                    buttons: [{
                      text: '确定',
                      handler: () => {
                        this.downloadApp();
                      }
                    }]
                  }).present();
                } else {
                  this.alertCtrl.create({
                    title: '升级',
                    subTitle: '发现新版本,是否立即升级？',
                    buttons: [{ text: '取消' },
                    {
                      text: '确定',
                      handler: () => {
                        this.downloadApp();
                      }
                    }
                    ]
                  }).present();
                }
              }
            })
          });
      })
    }
  }

  /**
   * 下载安装app
   */
  downloadApp(): void {
    if (this.isIos()) {//ios打开网页下载
      this.openUrlByBrowser(APP_DOWNLOAD);
    }
    if (this.isAndroid()) {//android本地下载
      //显示下载进度
      let alert = this.alertCtrl.create({
        title: '下载进度：0%',
        enableBackdropDismiss: false,
        buttons: ['后台下载']
      });
      alert.present();

      const fileTransfer: FileTransferObject = this.transfer.create();
      const apk = this.file.externalRootDirectory + 'android.apk'; //apk保存的目录

      //下载并安装apk
      fileTransfer.download(APK_DOWNLOAD, apk).then(() => {
        window['install'].install(apk.replace('file://', ''));
      }, err => {
        alert.dismiss();
        this.alertCtrl.create({
          title: '前往网页下载',
          subTitle: '本地升级失败',
          buttons: [
            {
              text: '确定',
              handler: () => {
                this.openUrlByBrowser(APP_DOWNLOAD);//打开网页下载
              }
            }
          ]
        }).present();
      });

      //更新下载进度
      fileTransfer.onProgress((event: ProgressEvent) => {
        let num = Math.floor(event.loaded / event.total * 100);
        if (num === 100) {
          alert.dismiss();
        } else {
          let title = document.getElementsByClassName('alert-title')[0];
          title && (title.innerHTML = '下载进度：' + num + '%');
        }
      });
    }
  }

  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 提示信息-需点击按钮确认
   * @param title 标题
   * @param subTitle 子标题-默认：""
   * @param buttonText 按钮名-默认：确定
   */
  alert(title: string, subTitle: string = "", buttonText: string = "确定"): void {
    this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{ text: buttonText }]
    }).present();
  }

  /**
   * 提示信息
   * @param message 信息内容
   * @param duration 显示时长，默认：2000，单位ms
   */
  showToast(message: string = '操作完成', duration: number = 2000): void {
    if (this.isMobile()) {
      this.toast.show(message, String(duration), 'bottom').subscribe();
    } else {
      this.toastCtrl.create({
        message: message,
        duration: duration,
        position: 'bottom',
        showCloseButton: false
      }).present();
    }
  };

  /**
   * 显示加载中状态
   * @param content 显示的内容，默认：空
   */
  showLoading(content: string = ''): void {
    if (!this.globalData.showLoading) {
      return;
    }
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        content: content
      });
      this.loading.present();
      setTimeout(() => {
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
      }, REQUEST_TIMEOUT);
    }
  };

  /**
   * 关闭加载中状态
   */
  hideLoading(): void {
    if (!this.globalData.showLoading) {
      this.globalData.showLoading = true;
    }
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  };

  /**
   * 根据图片绝对路径转化为base64字符串
   * @param path 绝对路径
   */
  convertImgToBase64(path: string): Observable<string> {
    return Observable.create(observer => {
      this.file.resolveLocalFilesystemUrl(path).then((fileEnter: FileEntry) => {
        fileEnter.file(file => {
          let reader = new FileReader();
          reader.onloadend = function (e) {
            observer.next(this.result);
          };
          reader.readAsDataURL(file);
        });
      }).catch(err => {

      });
    });
  }

  /**
   * 获得app版本号,如0.01<br/>
   * 对应/config.xml中version的值
   */
  getVersionNumber(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getVersionNumber().then((value: string) => {
        observer.next(value);
      }).catch(err => {
      });
    });
  }

  /**
   * 获得app名称<br/>
   * 对应/config.xml中name的值
   */
  getAppName(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getAppName().then((value: string) => {
        observer.next(value);
      }).catch(err => {
      });
    });
  }

  /**
   * 获得app包名id,如com.kit.ionic2tabs<br/>
   * 对应/config.xml中id的值
   */
  getPackageName(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getPackageName().then((value: string) => {
        observer.next(value);
      }).catch(err => {
      });
    });
  }

  /**
   * 获得用户当前坐标
   */
  getUserLocation(): Observable<Position> {
    return Observable.create(observer => {
      if (this.isMobile()) {
        baidumap_location.getCurrentPosition(data => {
          observer.next({ 'lng': data.longitude, 'lat': data.latitude });
        }, msg => {
          observer.error('获取位置失败');
          if (msg.indexOf('缺少定位权限') == -1) {
            this.alert('缺少定位权限，请在手机设置中开启');
            return;
          }
          this.alert('错误消息：' + msg);
        });
      } else {
        this.showToast('非手机环境,即测试环境返回固定坐标');
        observer.next({ 'lng': 113.706808, 'lat': 36.783879 });
      }
    });
  }

  /**
   * 使用百度地图定位
   */
  getUserGps(): Observable<Position> {
    return Observable.create(observer => {
      if (this.isMobile()) {
        baidumap_location.getCurrentPosition(function (result) {
          observer.next(result);
        }, function (error) {

        });
      } else {
        this.showToast('非手机环境,即测试环境返回固定坐标');
        observer.next({ 'lng': 113.706808, 'lat': 36.783879 });
      }
    });
  }

}
