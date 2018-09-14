//根据不同请求路径处理路由
var fs = require('fs');
//express提供了一种更好的方法，专门来包装路由
var express = require('express');//第一步
var router = express.Router();//创建一个路由容器，第二步
var student=require('./student')
// router.get('/students', function (req, res) {//没有封装之前的写法
//     //第二个参数是可选的，如果传入utf8就是告诉把读到的文件就直接按照utf8编译解析;
//     //除了这种方法，还可以直接通过data.tostring()方法
//     fs.readFile('./adb.json', 'utf8', function (err, data) {
//         if (err) {
//             return res.status(500).send('Server Erro')
//         }
//         res.render('index.html', {
//             fruits: [
//                 {
//                     name: '校长',
//                     scr: '海南香'
//                 },
//                 {
//                     name: '副校长',
//                     scr: '红富士'
//                 },
//                 {
//                     name: '主任',
//                     scr: '汶川李'
//                 },
//                 {
//                     name: '教授',
//                     scr: '野生核'
//                 }

//             ],

//             students: JSON.parse(data).students
//         })


//     })

// })

//封装之后
 router.get('/students',function(req,res){
    student.findAll(function(err,students){
     if(err){
        return res.status(500).send('Server Erro')
     }
     res.render('index.html',{
        fruits: [
                            {
                                name: '校长',
                                scr: '海南香'
                            },
                            {
                                name: '副校长',
                                scr: '红富士'
                            },
                            {
                                name: '主任',
                                scr: '汶川李'
                            },
                            {
                                name: '教授',
                                scr: '野生核'
                            }
            
                ],
        students:students 
     })
    })
   
 })



router.get('/students/new', function (req, res) {
    res.render('new.html')

})


router.post('/students/new', function (req, res) {
    //1.获取表单数据
    //2.处理 保存文件中，用以持久化
    //先读出来，转化为对象，然后添加进去，然后转再存进去students
    //3。发送请求
    student.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('保存失败')
        }
    })
    res.redirect('/students')
})

//渲染编辑页面
router.get('/students/edit', function (req, res) {
    //在客户端的列表页中处理链接问题（需要id）
    //获取编辑学生的id
    //渲染编辑页面
   student.findById(parseInt(req.query.id),function(err,student){ 
         if(err){
           return res.status(500).send('修改失败')
         }
       res.render('edit.html',{
        student:student 
       })
   })



})


//处理编辑学生
router.post('/students/edit', function (req, res) {
    //获取数据 req.body
    //保存更新 student.update()
    //发送响应
    student.updateByid(req.body,function(err){
         if(err){
            return res.status(500).send('修改文件失败')
         }
    
       res.redirect('/students')
    })

})


router.get('/students/delete', function (req, res) {
    student.delete(req.query.id,function(err){//get 得到参数为req.query;post为req.body
     if(err){
        return res.status(500).send('没有删除成功')
     }
 
     res.redirect('/students')
    })
 
})
module.exports = router;//第三步

//这种方法也能实现
// module.exports=function(app){
//     app.get('/students', function (req, res) {
//         //res.send('hello ')
//         //第二个参数是可选的，如果传入utf8就是告诉把读到的文件就直接按照utf8编译解析;
//         //除了这种方法，还可以直接通过data.tostring()方法
//         fs.readFile('./adb.json', 'utf8', function (err, data) {
//             if (err) {
//                 return res.status(500).send('Server Erro')
//             }
//             res.render('index.html', {
//                 fruits: [
//                     {
//                         name: '香蕉',
//                         scr: '海南香蕉'
//                     },
//                     {
//                         name: '苹果',
//                         scr: '红富士'
//                     },
//                     {
//                         name: '李子',
//                         scr: '汶川李子'
//                     },
//                     {
//                         name: '核桃',
//                         scr: '野生核桃'
//                     }

//                 ],

//                 students: JSON.parse(data).students
//             })


//         })

//     })



// }
