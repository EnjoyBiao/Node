var express=require('express');
 var app=express();
 //当以/public/开头的时候，就去 ./public/目录中找对应的资源
  //app.use('/public/',express.static('./public/'))
  //当省略第一各参数的时候，则可以通过省略/public的方式来访问
   //http://10.31.11.191:3000/login.html
   //app.use(express.static('./public/js'));
  // app.use(express.static('./public'));
  // app.use('/a/',express.static('./public'))//相当于别名
  
  
 // express为response相应对象提供了一个方法：render
  //render方法默认是不可以使用的，但是配置了模板引擎，就可以使用了
  //res.render('html模板名'，{模板数据})
 // 地一个参数不能写路径就回去views目录查找对应的模板文件
 //如果想修改默认路径用app.set('views',render函数的默认路径)
  
  app.engine('html', require('express-art-template'));
  app.get('/',function(req,res){
    res.send('首页 +10.31.11.191 ')
   
  })
  app.get('/a',function(req,res){
    //res.send('a页面')
    res.render('404.html',{
    	content:'404 Not Found'   	
    	})
     
  })
 app.listen(3000,function(){
   console.log('成功')
 })