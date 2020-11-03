# 通过Electron实现静默打印
> 目标: 解决浏览器无法实现静默打印功能。

依赖
1. [electronjs](https://www.electronjs.org/)
    
    使用 JavaScript、HTML 和 CSS 打造跨平臺桌面應用程式.


## 安装
```javascript
git clone https://github.com/Liar0320/electron-print-slient.git
//安装依赖
npm i
//开发环境
npm run start
//生产环境
npm run packager-app-production
```
## 使用
> 配置: 
>       可自行配置setting.js中**appUrl**的路径来渲染客户端页面。
>       可自行配置setting.js中**deviceName**指定采用的打印机。
1. 通过Electron实现程序调用系统的打印服务，来解决在浏览器中打印必须通过用户预览才能进行。
2. 通过采用让客户安装插件的方式来实现浏览器通过socket调用该服务进行打印。

## Demo
![案例](./demo.png)