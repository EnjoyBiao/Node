var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });//链接数据库

var username=new Schema({
  email:{
      type:String,
      required:true,
      default:'154798220@qq.com'
  },
   nickname:{
      type:String,
      required:true,
      default:'默认值'
  },
  password:{
      type:String,
      required:true
  },
   create_time:{
       type:Date,
       default:Date.now//这里不要写now(),否则会即时调用。就是一个写死的时间戳;不加表示一个方法，
   },
   last_modfied_time:{//最后修改时间
        type:Date,
        default:Date.now
   },
   bio:{//简介
      type:String,
      default:'' 
   },
   avatar:{//头像
       type:String,
       default:'/public/img/'
   },
   gender:{//性别，男、女、保密
       type:Number,
       enum:[-1,0,1],
       default:-1
   },
   birthday:{//生日
       type:Date,

   },
   states:{//用户状态，0 没有权限限制，1 不可以评论， 2 不可以登录
       type:Number,
       enum:[0,1,2],
       default:0
   }
});
module.exports=mongoose.model('User',username)