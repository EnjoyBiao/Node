/* 入口模块
//  职责：启动服务，监听端口，
// 	 解析表单post亲求
挂载路由
*/ 	 
var express = require('express');
var exArtTemplate = require('express-art-template');
var app = express();
var   bodyParser=require('body-parser')
app.use('/node_modules', express.static('./node_modules'));
app.use('/public', express.static('./public'));
app.engine('html', exArtTemplate);
//express postq请求的中间件，body-parser
//一定要在app.use(router)挂载路由之前
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



var router=require('./router')
//router(app)
app.use(router)//把router挂载到app实例中
app.listen(8000, function () {
	console.log('成功')
})




