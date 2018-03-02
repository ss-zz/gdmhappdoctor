import { Injectable } from "@angular/core";
import { ActionSheetController } from "ionic-angular";
import { Camera } from "@ionic-native/camera";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { GlobalData } from "./GlobalData";
import { NativeService } from "./NativeService";

/**
 * 照片服务
 */
@Injectable()
export class ImgService {

  // token 信息
  private token;

  // 用户头像参数
  upload: any = {
    url: '',// 接收图片的url
    fileKey: 'file',
    headers: {
      'access-token': this.token,
    },
    params: {},// 需要额外上传的参数
    success: (data) => { },// 图片上传成功后的回调
    error: (err) => { },// 图片上传失败后的回调
    listen: () => { }// 监听上传过程
  };

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public Camera: Camera,
    public fileTransfer: FileTransfer,
    public globalData: GlobalData,
    private nativeService: NativeService) {
  }

  // 选择照片
  selectPhoto() {
    return this.useASComponent();
  }

  // 使用ionic中的ActionSheet组件
  private useASComponent() {
    return new Promise<Object>((resolve, reject) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: '选择',
        buttons: [
          {
            text: '拍照',
            handler: () => {
              this.startCamera()
            }
          },
          {
            text: '从相册选择',
            handler: () => {
              this.openImgPicker()
            }
          },
          {
            text: '取消',
            role: 'cancel',
            handler: () => { }
          }
        ]
      });
      actionSheet.present();
    })
  }

  // 启动拍照功能
  private startCamera() {
    let options = {
      quality: 50,
      destinationType: this.Camera.DestinationType.FILE_URI,
      sourceType: this.Camera.PictureSourceType.CAMERA,
      encodingType: this.Camera.EncodingType.JPEG,
      mediaType: this.Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true
    };
    return new Promise<Object>((resolve, reject) => {
      this.Camera.getPicture(options).then((imageData) => {
        resolve(imageData);
      }, (err) => {
        this.nativeService.showToast("启动相机失败");
        reject();
      });
    })
  }

  // 打开手机相册
  private openImgPicker() {
    var options = {
      quality: 50,
      destinationType: this.Camera.DestinationType.FILE_URI,
      sourceType: this.Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.Camera.EncodingType.JPEG,
      mediaType: this.Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true
    }
    return new Promise<Object>((resolve, reject) => {
      this.Camera.getPicture(options).then((imageData) => {
        resolve(imageData);
      }, err => {
        this.nativeService.showToast("打开相册失败");
        reject();
      });

    })

  }

  // 上传图片
  public uploadImg(path: string) {
    if (!path) {
      return;
    }
    this.nativeService.showLoading('正在上传');
    let options: any;
    options = {
      fileKey: this.upload.fileKey,
      fileName: 'avtor.jpg',
      headers: this.upload.headers,
      params: this.upload.params
    };
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    options.params.file = 'avtor.jpg';
    fileTransfer.upload(path, this.upload.url, options)
      .then((data) => {
        this.nativeService.hideLoading();
        if (this.upload.success) {
          this.upload.success(data);
        }
      }, (err) => {
        this.nativeService.hideLoading();
        if (this.upload.error) {
          this.upload.error(err);
        } else {

        }
      });
  }
}
