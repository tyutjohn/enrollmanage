const mongoose=require('mongoose');

var produtSchema=new mongoose.Schema({
    'AccessKeyId':String,
    'AccessKeySecret':String,
    'queryuptime':Number,
    'querydowntime':Number,
    'signuptime':Number,
    'signdowntime':Number
});

module.exports=mongoose.model('Config',produtSchema,'configs');