const mongoose=require('mongoose');

var produtSchema=new mongoose.Schema({
    'AccessKeyId':String,
    'AccessKeySecret':String,
    'queryuptime':String,
    'querydowntime':String,
    'signuptime':String,
    'signdowntime':String
});

module.exports=mongoose.model('Config',produtSchema,'configs');