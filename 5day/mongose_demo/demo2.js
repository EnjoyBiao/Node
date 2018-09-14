var mongoose=require('mongoose');
var Schema=mongoose.Schema;
//1. 链接本地数据库（test），如果没有，当第一次插入数据库的时候就自动创建
mongoose.connect('mongodb://localhost/test');
// 2 .设计表结构，字段名称值的类型是js的基本数据类型
//约束数据就是保证数据的完整性
var userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:Number,
        required:true
    },
    email:{
        type:String,

    }
  });
  //3.将文档结构发布为模型
    //mongoose.model这个方法就是把架构发布为模型
    //第一个参数传入大写单数字符串表示数据库名，
    //mongoose会自动转换为小写复数字符串（users）的表名

    //第二个参数就是定义的架构
    //返回值，：模型构造函数
  var User=mongoose.model('User',userSchema);
  //4.得到模型，增、删、改、查
//增

//   var admin= new User({
//        username:'demo3',
//        password:123456,
//        email:'154798220@qq.com'
//    });
//    admin.save(function(err,res){
//       if(err){
//            console.log('增加失败')
//       }else{
//           console.log(res)
//       }
//    })
 
//查
// User.find(function(err,ret){//全部查询
//   if(err){
//     console.log('查询失败')
//   }else{
//       console.log('查询到的数据：'+ret)
//   }
// })
// User.find({
//     username:'demo2'
// },function(err,ret){//全部查询
//     if(err){
//       console.log('查询失败')
//     }else{
//         console.log('条件查询到的数据：'+ret)
//     }
//   })

  //删

  User.remove({
      username:'demo2'
  },function(err,ret){
      console.log(ret)
  })
//改。更新数据
User.findByIdAndUpdate('5b8cdb8c3f1b9b7ae8fccf9e',{
     username:'修改后'
},function(err,ret){
   console.log(ret)
})
User.update({
    password:123456,
},{
    password:789
},function(err,ret){
  console.log(ret)
})







