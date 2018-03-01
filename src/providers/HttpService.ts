import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  URLSearchParams,
  RequestOptionsArgs,
  RequestMethod
} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable, TimeoutError } from "rxjs";

import { GlobalData } from "./GlobalData";
import { NativeService } from "./NativeService";
import { APP_SERVE_URL, REQUEST_TIMEOUT } from "./Constants";

/**
 * 网络请求服务
 */
@Injectable()
export class HttpService {

  constructor(
    public http: Http,
    private globalData: GlobalData,
    private nativeService: NativeService
  ) { }

  /**
   * 请求远程数据
   * @param url 请求地址
   * @param options 请求配置
   */
  public request(url: string, options: RequestOptionsArgs, ishowload: boolean = true): Observable<Response> {
    // 转换url地址，若为绝对路径，则不变，若为相对路径，则补充接口前缀地址
    url = url.startsWith('http') ? url : APP_SERVE_URL + url;

    // 增加token
    options = this.optionsAddToken(options);

    // 创建请求
    return Observable.create(observer => {
      // 显示加载状态
      if (ishowload) {
        this.nativeService.showLoading();
      }
      // 请求
      this.http.request(url, options)
        .timeout(REQUEST_TIMEOUT)// 设置超时时间
        .map(res => res.json())// 转换为json对象
        .subscribe((res: any) => {// 订阅请求返回结果
          // 隐藏加载状态
          this.nativeService.hideLoading();
          if (res.success == 200) {
            observer.next(res.data);
          } else {
            this.nativeService.alert(res.msg);
          }
        }, err => {// 请求失败
          this.requestFailed(url, options, err);//处理请求失败
          observer.error(err);
        });
    });
  }

  /**
   * get请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public get(url: string, param: any = null, ishowload: boolean = true): Observable<Response> {
    return this.request(url, {
      method: RequestMethod.Get,
      search: this.buildURLSearchParams(param)
    }, ishowload);
  }

  /**
   * post请求【json格式参数】
   * @param url 请求地址
   * @param param 请求参数
   */
  public post(url: string, param: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: param,
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      })
    }));
  }

  /**
   * post请求【form格式参数】
   * @param url 请求地址
   * @param param 请求参数
   */
  public postForm(url: string, param: any = null, ishowload: boolean = true): Observable<Response> {

    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: this.buildURLSearchParams(param),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }), ishowload);

  }

  /**
   * put请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public put(url: string, param: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Put,
      body: param
    }));
  }

  /**
   * delete请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public delete(url: string, param: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Delete,
      body: param
    }));
  }

  /**
   * patch请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public patch(url: string, param: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Patch,
      body: param
    }));
  }

  /**
   * head请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public head(url: string, param: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Head,
      search: param
    }));
  }

  /**
   * options请求
   * @param url 请求地址
   * @param param 请求参数
   */
  public options(url: string, param: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Options,
      search: param
    }));
  }

  /**
   * 将对象转为查询参数
   * @param param 参数
   * @returns 查询参数
   */
  private buildURLSearchParams(param): URLSearchParams {
    let searchParams = new URLSearchParams();
    if (!param) {
      return searchParams;
    }
    let newParams = param;
    for (let key in newParams) {
      let val = newParams[key];
      searchParams.set(key, val);
    }
    return searchParams;
  }

  /**
   * 处理请求失败事件
   * @param url 请求地址
   * @param options 请求配置
   * @param err 返回结果
   */
  private requestFailed(url: string, options: RequestOptionsArgs, err: Response): void {
    // 隐藏加载状态
    this.nativeService.hideLoading();

    // 请求超时错误
    if (err instanceof TimeoutError) {
      this.nativeService.alert('请求超时,请稍后再试!');
      return;
    }

    // 未联网
    if (!this.nativeService.isConnecting()) {
      this.nativeService.alert('请求失败，请连接网络');
      return;
    }

    let msg = '请求失败';
    try {
      let result = err.json();
      // 提示失败信息
      this.nativeService.alert(result.message || msg);
    } catch (err) {
      let status = err.status;
      if (status === 0) {
        msg = '请求失败，请求响应出错';
      } else if (status === 401) {
        msg = '请求失败，请重新登录';
      } else if (status === 403) {
        msg = '请求失败，无权访问';
      } else if (status === 404) {
        msg = '请求失败，未找到请求地址';
      } else if (status === 500) {
        msg = '请求失败，服务器出错，请稍后再试';
      }
      this.nativeService.alert(msg);
    }
  }

  /**
   * 增加请求token
   * @param options
   */
  private optionsAddToken(options: RequestOptionsArgs) {
    if (!options) return;
    let token = this.globalData.token;
    let method = options.method;
    if (options.headers) {
      options.headers.append('access-token', token);
      options.method = method;
    } else {
      options.headers = new Headers({
        'token': token
      });
      options.method = method;
    }
    return options;
  }

}
