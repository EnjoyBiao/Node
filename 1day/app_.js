var express=require('express');
var app=express();
 app.use('/a',express.static('./views/'))
app.engine('html', require('express-art-template'));
app.get('/',function(req,res){
	  res.send('不好意思')
	})
	app.get('/a',function(req,res){
	  res.render('404.html')
	})
	app.listen('3000',function(){
		
		 console.log('express 成功啦')
		})