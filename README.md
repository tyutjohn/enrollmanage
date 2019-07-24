# enrollmanage
> [项目地址](http://yiban.tyutjohn.com)
> 招新报名管理系统(太原理工大学易班发展中心定制化)

# 项目介绍

> 这是一套集成前后台的完整的SPA多页面报名管理系统，基于nodejs V8.12.0,express3.6.0,vue v2.5.2,阿里云短信SMS V1.1.6
> 主要功能:报名入口，查询入口，报名后台管理系统,echarts数据可视化报表，阿里云短信通知

# 项目截图
![登陆](http://yiban.tyutjohn.com/images/01.png)
![](http://yiban.tyutjohn.com/images/02.png)
![](http://yiban.tyutjohn.com/images/03.png)
![](http://yiban.tyutjohn.com/images/04.png)
![](http://yiban.tyutjohn.com/images/05.png)
![](http://yiban.tyutjohn.com/images/06.png)

# 项目目录结构
* build --webpack打包目录
* config  --webpack配置目录
* server --node-express后台目录
* src --vue前台目录

# 本地启动
* 根目录下的package.json的依赖包含前后台所有模块，若为本地启动，根目录下运行 cnpm i,启动redis,mongodb数据库,运行 node server/bin/www启动后台,运行cnpm run dev启动前台

# 服务器部署
* 安装运行redis,mongodb数据库，建立名为enroll的mongodb数据库，运行数据库表
* server目录下的package.json的依赖为后台模块,若部署服务器后台，将server文件夹上传至服务器，运行cnpm i,若使用pm2启动,运行cnpm i pm2 -g,切换至server目录下，运行pm2 start bin/www，启动后台服务
* 前台项目使用cnpm run build打包生成dist文件夹，将dist文件夹下的index.html和static文件夹上传至nginx服务器下，ubuntu默认目录为/var/www/html/，配置nginx服务器，cd /etc/nginx/conf.d，vi test.conf
* test.conf

server{
listen 80;
        listen [::]:80;
        root /var/www/html/;    //nginx服务器目录        
        index index.html;
        server_name 这是你的域名;  //域名,例如:test.com
        location / {
        }
	    location ^~ /admin/{
		    proxy_pass http://127.0.0.1:3000/admin/;    //后台端口代理
	    }
        location ^~ /users/{
            proxy_pass http://127.0.0.1:3000/users/;    //后台端口代理
        }
}
* 运行cd /etc/nginx，vi nginx.conf,在http里面最后加 include /etc/nginx/conf.d/*.conf;退出保存,运行nginx -s reload立即生效配置,运行service nginx restart重启nginx服务器
* 访问test.conf里面绑定的域名，若出现项目页面则启动正常

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