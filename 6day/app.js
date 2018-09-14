var express=require('express');
var path=require('path');
var router=require('./router')
var app=express();
var bodyParser=require('body-parser')

//在express这个框架中，默认是不支持session和Cookie
//但我们可以使用第三方中间件：express-session来解决（下载，配置(路由之前)，使用req.session）
//添加：req.session.foo(键)='value(值)'
//访问：req.session.foo
var session = require('express-session')
app.use(session({
    secret: 'keyboard cat',//加密字符串，自定义的。安全性更加高。在原有加密基础上再和这个字符串拼接起来在加密
    resave: false,
    saveUninitialized: true//无论是否使用session,默认都给你钥匙。false只有使用session存储数据时候才分配钥匙
  }))

app.engine('html', require('express-art-template'));
// app.use('views',express.static(path.join(__dirname,'./views/')));//默认就是views目录
app.use('/public/',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules')));
//body-parser用于于post请求的中间件，用与获取数据，一定要在挂在路由之前引入
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router)
app.listen(8000,function(){
    console.log('启动成功')
})