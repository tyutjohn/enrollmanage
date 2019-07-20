# enrollmanage

> 招新报名管理系统(太原理工大学易班发展中心定制化)

# 项目介绍

> 这是一套集成前后台的完整的SPA多页面报名管理系统，基于nodejs V8.12.0,express3.6.0,vue v2.5.2,阿里云短信SMS V1.1.6
> 主要功能:报名入口，查询入口，报名后台管理系统,echarts数据可视化报表，阿里云短信通知

# 项目目录结构
* build --webpack打包目录
* config  --webpack配置目录
* server --node-express后台目录
* src --vue前台目录

## 启动项目

``` bash
# install database
安装并启动mongodb,redis
mongodb默认数据库名为enroll,修改数据库名称位于server/routes/users.js 第15行

# install dependencies
npm install

# 前台启动地址，localhost:8080
npm run dev

# 后台启动地址，localhost:3000
node server/bin/www

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
# 开发人员

> 太原理工大学 johnwang
> 如有问题请提交issues,联系至邮(tyutjohnwang@163.com)