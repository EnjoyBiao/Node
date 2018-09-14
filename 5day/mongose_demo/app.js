//mongo
//> show dbs
// admin   0.000GB
// ittest  0.000GB
// local   0.000GB
// test    0.000GB
// > db
// test
// > db.test.find()
// 2018-08-29T17:08:41.379+0800 E QUERY    [thread1] TypeError: db.test.fund is not a function :
// @(shell):1:1
// > db.test.find()
// > show collections
// cats
// > db.cats.find()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//在设计数据库
const Cat = mongoose.model('Cat', { name: String });
//实例化一个cat
const kitty = new Cat({ name: 'Zildjian' });
//持久保存
kitty.save().then(() => console.log('meow'));