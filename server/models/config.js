const mongoose=require('mongoose');

var produtSchema=new mongoose.Schema({
    'AccessKeyId':String,
    'AccessKeySecret':String
});

module.exports=mongoose.model('Config',produtSchema,'configs');