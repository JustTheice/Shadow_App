var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shadow_app', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接数据库失败:'));
db.once('open', function() {
  console.log('已连接到shadow_app数据库');
});

module.exports = db;