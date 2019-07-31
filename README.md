# enrollmanage
> [项目地址](https://www.tyutjohn.com)
> 招新报名管理系统(太原理工大学易班发展中心定制化)

# 项目介绍

> 这是一套集成前后台的完整的SPA多页面报名管理系统，基于nodejs V8.12.0,express3.6.0,vue v2.5.2,阿里云短信SMS V1.1.6
> 主要功能:报名入口，查询入口，报名后台管理系统,echarts数据可视化报表，阿里云短信通知

# 项目截图
![](https://www.tyutjohn.com/images/01.png)
![](https://www.tyutjohn.com/images/03.png)
![](https://www.tyutjohn.com/images/04.png)
![](https://www.tyutjohn.com/images/06.png)

# 项目目录结构
* build --webpack打包目录
* config  --webpack配置目录
* server --node-express后台目录
* src --vue前台目录

# 本地启动
1. 安装运行redis,mongodb数据库
2. 安装依赖
```
cnpm install
cd server/
cnpm install
```
3. 启动项目
``` bash
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

# 服务器部署

1. 安装数据库
```
# install redis,mongodb
sudo apt-get install redis-server mongodb

# create mongodb database
建立enroll数据库，运行数据库表
```
2. 运行node后台
```
# install nodejs,pm2
sudo apt-get install nodejs
npm install pm2 -g

# 安装后台项目依赖
cd server
cnpm install/npm install

# pm2启动后台
pm2 start bin/www
```
3. 安装nginx
```
# install nginx
sudo apt-get install nginx

# 配置nginx服务器
vi /etc/nginx/conf.d/yiban.conf

server{
listen 80;
        listen [::]:80;
        root /var/www/html/yiban;    //nginx服务器目录        
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

:wq //保存退出

# 重启nginx服务器
nginx -s reload
service nginx restart

# ssl证书配置
cd /etc/nginx/
mkdir cert

将证书上传至cert文件夹下
如a.pem,a.key

# https配置
vi /etc/nginx/conf.d/ssl.conf

server{
	listen 443;
	server_name 你的域名;   //填写https证书解析的域名,如 www.test.com
	ssl on;
	root /var/www/html/yiban/;      //项目目录
	index index.html;
	ssl_certificate /etc/nginx/cert/a.pem;      //ssl证书，命名根据自己实际证书名修改
	ssl_certificate_key /etc/nginx/cert/a.key;      //ssl证书密钥
	ssl_session_timeout 5m;
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers on;
	location / {
		root /var/www/html/yiban/;
		index index.html;
	}
	location ^~ /admin/ {
		proxy_pass http://127.0.0.1:3000/admin/;    //后台接口代理
	}
	location ^~ /users/ {
		proxy_pass http://127.0.0.1:3000/users/;    //后台接口代理
	}
}

:wq //保存退出

# nginx服务器重启
nginx -s reload
service nginx restart
```
4. 运行前台 
```
# 打包前台资源
cnpm install
cnpm run build

# 部署至nginx服务器
mv dist/ /var/www/html/yiban/
```

# 关于作者

+ 太原理工大学 johnwang,[个人博客](www.tyutjohn.com)
+ 如有问题请提交issues
+ 任何人未经允许，禁止用于商业/营销/宣传等。
+ 联系作者请至邮(tyutjohnwang@163.com)

# END
如果觉得我的项目不错的话，就给个star鼓励一下吧