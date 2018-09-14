var http=require('http');
var fs=require('fs');
var url=require('url');
var template=require('art-template')
var comments=[
	{
		name:'陈彪',
		message:'我是哥哥',
		dateTime:'2018.07.12'
	},
	{
		name:'陈鹏',
		message:'我是弟弟',
		dateTime:'2018.07.12'
	},
	{
		name:'陈娇',
		message:'我是妹妹',
		dateTime:'2018.07.12'
	},
];
///pinlun?name=地方的&message=地方第三方地方地方但是发地方
//对于这种表单提交的请求i路径，由于其中具有用户动态填写的内容
//所以我们不能判断完整的路径url来处理这个请求
//结论：我们只需要判断路径/pinlun;表示提交了表单过来了
http.createServer(function(req,response){
	//使用url.parse，将路径解析成方便处理的对象，第二个参数为true,表示直接将查询字符串转化为一个对象
	var paseObj=url.parse(req.url,true);
	
	var pathname=paseObj.pathname;//该路径不含？之后的内容
	//var _url=req.url;
	   //静态资源存放在public文件下面，那些可以访问那些不可以可以通过代码控制
			if(pathname ==='/'){
				//response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
			    	response.writeHead(200,{'Content-Type':'text/html'})
				// 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
								fs.readFile('../views/shouye.html',function(err,data){
										if(err){
										return 	response.end('404 not found1'); ;
										}

								   //利用模板引擎
								   var htmlStr=template.render(data.toString(),{
									   comments:comments
								   })                        
								response.end(htmlStr);
								});
			}else if(pathname.indexOf('/public/')==0){
				  // /public/css/main.cssd 等
				  //统一处理：如果请求路径是以 /public/开头，则我就认为你要获取public中的某个资源
				      //所以我们就直接可以把亲球路径当作文件路径来直接进行读取
				   fs.readFile('..'+pathname,function(err,data){
				   	  if(err){
				   	  	return response.end('404 not found2')
							 }
							 //浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统默认的编码格式去解析
							//中文的操作系统是jbk
							//所以解决方法是告诉浏览器，需要用什么方法去解析
							// /text/plain普通文本
					   response.setHeader('Content-Type','text/plain;charset=utf-8')	 
				   	   response.end(data)
				   	
				   	
				   	})
				
			}else if(pathname ==='/post'){
				response.writeHead(200,{'Content-Type':'text/html'})
                  fs.readFile('../views/post.html',function(err,data){
                   if(err){
					response.end('没有找到评论页面')
				   }
				   response.writeHead(200,{'Content-Type':'text/html'})
				   response.end(data)
				 })
			}else if(pathname === '/pinlun'){
				//response.end( JSON.stringify( paseObj.query))
				//接下来要做的
				//1.获取表单提交的数据 paseObj.query
				//2.生成日期到数据中，然后储存到数组中
				//3.让用户重定向到首页 / 
				  //用户请求 /的时候，数组中数据发生变化，所一用户看到的页面也就发生了变化。
				var comment= paseObj.query;
				    comment.dateTime=new Date(2009,1,1);
                 comments.unshift(comment)
			 //服务器这个时候就已经储存好了数据，接下来就重定向请求首页/ 
			 //如何通过服务器让客户端重定向：
				//1.状态码设置为302临时重定向，301永久重定向2。
				//在响应头中通过loaction告诉客户端往哪儿重定向
				//如果客户端发现收到的服务端状态码（默认200）是302,就会自动去相应头中找loaction，然后对该地址发起新的请求;
				//所以你就会看到，客户端自动跳转了
				response.statusCode=302;
				response.setHeader('Location','/');
				response.end();

			}
					
			else{
					
					response.end('404 not fund')
					
					}
					
					

	})
	.listen(8070,function(){
		 console.log('running')
		
		})