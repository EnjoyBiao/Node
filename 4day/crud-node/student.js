//数据操作文件模块，职责：是关心数据，不关心业务
var fs = require('fs')


//1.获取所有学生列表
var adbpath = './adb.json';
exports.findAll = function (callback) {
    fs.readFile(adbpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err);
        }

        callback(null, JSON.parse(data).students)
    })

}



//2.添加一个学生
exports.save = function (newData, callback) {
    fs.readFile(adbpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        //取出数据，追加id，然后放进去
        var students = JSON.parse(data).students;
       if(students.length==0){
        newData.id =0;
       }else{
        newData.id = students[students.length - 1].id + 1;
       }
        
        students.push(newData);
        var fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(adbpath, fileData, function (err) {
            if (err) {
                return callback(err)
            } else {
                return callback(null)
            }


        })
    })

}

//3.更新学生
exports.updateByid = function (student, callback) {
    fs.readFile(adbpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students;
        student.id = parseInt(student.id)//统一id为number
        //找出对应id,ES6的find方法,便利所有项，返回符合项
        var stu = students.find(function (item) {
            return item.id === student.id
        })
        for (var key in student) {
            stu[key] = student[key]
        }
        var fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(adbpath, fileData, function (err) {
            if (err) {
                return callback(err)
            } else {
                return callback(null)
            }

        })

    })
}
//编辑，根据id查找
exports.findById = function (id, callback) {
    fs.readFile(adbpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function (item) {
            return item.id === parseInt(id)

        })
        callback(null, ret)

    })


}






//4.删除学生
exports.delete = function (id, callback) {
    fs.readFile(adbpath, 'utf8', function (err, data) {
        if (err) {
            callback(err)
        }
        var students = JSON.parse(data).students

        var index_id = students.findIndex(function (item) {

            return item.id === parseInt(id)
        })
        students.splice(index_id, 1)//根据下标删除
    //    var students = JSON.stringify(students);
        var obj={};
        obj.students=students
        fs.writeFile(adbpath, JSON.stringify(obj), function (err) {
            if (err) {
                return callback(err)
            } else {
                return callback(null)
            }

        })
    })



}