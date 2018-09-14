var express = require('express');
var router = express.Router();
var User = require('./modules/user')
var md5=require('blueimp-md5')//加密
//首页
router.get('/', function (req, res) {
   //.console.log(req.session.user.nickname)
   let nickname=req.session.user
   if(req.session.user !=undefined){
    nickname=req.session.user.nickname
   }else{
    nickname="nicname"
   }
   
  res.render('index.html', {
    name: '首页1',
    user:nickname
  })
})
//登录
router.get('/login', function (req, res) {
  res.render('login.html')
})
router.post('/login', function (req, res) {
   var body=req.body;
   User.findOne({
     nickname:body.nickname,
    //password:md5(md5(body.password)) 查询密码要加密后再查
    
    },function(err,data){
              if(err){
                return res.status(500).json({
                  err_code:500,//自定义的错误状态码
                  message:err.message
                })
              }
             
              if(!data){
              return res.status(200).json({//异步提交
                err_code:1,
                message:'用户名错误' 
                  })
             } 
             req.session.user=data
           res.status(200).json({
             err_code:0,
             message:'ok'
           })  
   })
  



  //res.render('login.html')
})
//注册 
router.get('/register', function (req, res) {
  res.render('register.html')
})
router.post('/register', function (req, res) {
  //1.获取表单提交的数据库

  //2.操作数据库
  //3.操作响应
  var body = req.body;
  User.findOne({
    $or: [
      {
        email:body.email
      },
      {
        nickname: body.nickname
      }
    ]
  },
    function (err, data) {
      if (err) {
        //return res.status(500).send('server Erro')
        return res.status(500).json({
          err_code:1,//自定义的错误状态码
          message:'服务器错误'
        })
      }
      if(data){//邮箱或者昵称存在
        
       // return res.status(200).send(data)
       return res.status(200).json({//异步提交
         err_code:1,
         message:'邮箱或者昵称已存在' 
           })
            // return res.render('register.html',{//同步提交式的提示(没有诞生ajax之前的处理方式)
            //   err_message:'邮箱已经存在',
            //   from:body//同步提交时，刷新页面，让先前所填的内容存在，只需放回所填数据，然后放进去value属性中（github,注册的处理方式）
            // })

      }
      //处理密码
      body.password=md5( body.password)//保险起见还可以加一层
      new User(body).save(function(err,user){
        if(err){
          return res.status(500).json({
            err_code:500,
            message:'服务器错误'
          })
        }
       //发送json格式的字符串可以用json.Stringfy()或者json()
      //return res.status(200).send('{"sucess":true}')

        req.session.user=user;
        return res.status(200).json({
          err_code:0,
          message:'ok'
        })
      })        
    }
  )
 
})
// router.post('/register',//用async解决异步嵌套
// async (req,res)=>{
//   var body = req.body;
//       try {
//         if(await User.findOne({ email:body.email})){
//             return res.status(200).json({
//                          err_code:1,//自定义的错误状态码
//                          message:'邮箱已存在'
//                        })
//         }
//         if(await User.findOne({ nickname: body.nickname})){
//            return res.status(200).json({
//                       err_code:1,
//                       message:'昵称已存在'
//                     })
//         }
//         body.password=md5( body.password)//保险起见还可以加一层
//         await new User(body).save();

       
//          res.status(200).json({
//                      err_code:0,
//                     message:'ok'
//                    })           

//       } catch (error) {
//         return res.status(500).json({
//                      err_code:500,
//                      message:error.message
//                    })
//       }
//    } 
//  )

//退出
  router.get('/gitout',function(req,res){
     req.session.user=null;
     res.redirect('/login')
  })

module.exports = router