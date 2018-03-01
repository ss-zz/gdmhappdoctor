# 环境依赖

## nodejs 
	
	官网下载

## ionic

	nodejs安装之后，在命令行执行npm install ionic -g

## cordova

	nodejs安装之后，在命令行执行npm install cordova -g

## 浏览器

	chrome/firefox等，用于在浏览器中调试程序。

## 文本编辑器

	推荐vs code（官网下载）。用于编辑源代码。

## android sdk

	发布、调试android版本需要，下载android sdk管理工具，并根据需要安装对应sdk。

## xcode

	发布、调试ios版本需要，需要mac电脑，安装xcode即可。


# 常用命令说明

## node/npm 相关

	安装完nodejs之后可使用npm命令。

* `npm init` 生成package.json文件（用于初始化并生成包管理文件package.json）
* `npm install` 安装当前目录中package.json文件中所有依赖包
* `npm install name` 安装名称为name的包到当前文件夹下node_modules目录中
* `npm install name@version` 安装名称为name、版本为version的包到当前文件夹下node_modules目录中
* `npm install name -g` 安装名称为name的包到全局
* `npm install name --save` 安装名称为name的包到当前文件夹下node_modules目录中，并将包信息添加到package.json文件中
* `npm uninstall name` 移除名称为name的包
* `npm search name` 查询名称为name的包
* `npm udate name` 更新名称为name的包
* `npm -help` npm帮助


## ionic/cordova 相关

	安装完ionic之后可使用ionic命令。安装完cordova之后可使用cordova命令。

* `ionic serve` 在浏览器中启动调试程序。
* `ionic cordova resources` 重新生成icon图标以及splash启动图
* `ionic cordova platform add android|ios` 添加对应平台
* `ionic cordova build android|ios` 打包app安装包（默认签名），ios版本需要使用xcode签名
* `ionic cordova build android --release` 打包android app安装包（未签名）。签名方式：1、手动；2、执行tools/android/sign/sign.bat脚本文件（具体查看对应目录中的README.MD文件）。
* `ionic start appname tabs|sidemenu|blank|super|tutorial` 安装模板项目
	* tabs : 标签菜单app-默认
	* sidemenu: 侧边栏菜单app
	* blank: 空白app
	* super: 包含14+个可用页面的app
	* tutorial: 向导app
* `ionic g|generate type name` 生成代码文件,name请使用大驼峰式命名：如"MyFamily"
	* `ionic g page Name` 生成页面
	* `ionic g component Name` 生成组件
	* `ionic g directive Name` 生成指令
	* `ionic g pipe Name` 生成管道
	* `ionic g provider Name` 生成服务
	* `ionic g tabs Name` 生成标签页
* `ionic cordova plugin add name` 添加名称为name的cordova插件
* `ionic cordova plugin remove name` 删除名称为name的cordova插件


# 常用操作

## 环境准备

* 安装nodejs
* 安装ionic、cordova
* 安装文本编辑器（IDE）、浏览器
* 安装android sdk（android）、xcode（ios）

## 创建模板项目（可选）

* ionic start appname tabs|sidemenu|blank|super|tutorial 

## 生成icon-图标以及splash-启动图

* ionic cordova resources

## 调试项目

* 下载项目源代码，并进入根目录
* 在根目录执行命令`npm install`

### 浏览器

* 在根目录执行命令`ionic serve`

### 手机

* `ionic cordova run android|ios` 
	* android：若usb连接手机，则自动在手机运行，若未连接手机，则启动模拟器。
	* ios：若usb连接手机，则自动在手机运行，若未连接手机，则启动模拟器。

## 打包项目

### android

* 在项目根目录执行命令`ionic cordova build android`。会在platforms/android目录中生成android版本相关文件。若需要手动签名，则命令后添加`--release`参数，然后手动签名。

### ios

* 在项目根目录执行命令`ionic cordova build ios`。会在platforms/ios目录中生成ios版本相关文件。

## 发布项目

### android

* `ionic cordova build android --release`生成待签名apk
* 签名apk
* 将签名后的apk发布web服务器或者各大android应用商店

### ios

* `ionic cordova build ios`生成待发布文件
* 使用xcode打开文件`paltforms/ios/appname.xcodeproj`
* 选择签名信息并调整相关配置
* archive（打包）项目
* 上传upload打包的版本

# 目录结构说明

```
|- node_moudles     依赖模块，执行npm install后生成
|- resources        资源目录：图标和启动图，执行ionic resources会重新生成图标和启动图
|- platforms        平台目录
|-|- android          android构建平台目录，执行ionic cordova platform add android后生成
|-|- ios              ios构建平台目录，执行ionic cordova platform add ios后生成
|- plugins         cordova插件目录，执行添加插件命令后生成：ionic cordova plugin add pluginname
|- src              源代码目录【规范】
|-|- app             app主入口模块
|-|- assets          资源文件目录，可用来存放图片、第三方插件库等
|-|- pages           页面文件根目录
|-|- components      组件文件根目录
|-|- pipes           管道文件根目录
|-|- providers       服务文件根目录
|-|- theme           主题文件根目录
|-|- index.html      app主入口页面
|-|- mainfest.json   --
|-|- service-worker.js  --
|- www              js构建内容
config.xml          app配置文件 
ionic.config.json  --
package-lock.json  --
packge.json        依赖模块文件。类似maven的pom.xml文件。

```

# 开发规范

* ts、scss、html文件缩进统一为2个空格。
* 代码文件编写完成之后请务必格式化文件。
* ts文件、方法必须添加注释
* 页面、组件、指令、服务文件要规范，可使用`ionic g`命令生成，然后根据需要移动到对应的目录中
* 严格按照目录结构说明中的目录描述创建对应文件
* 页面单独使用的样式写在本页面模块对应的scss文件中，公共样式写在app.scss文件中，主题配置信息写在variables.scss文件中。依赖于主题的样式请使用scss语法从主题样式文件中获取。
