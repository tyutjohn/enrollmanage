const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var produtSchema=mongoose.Schema({
    'AccessKeyId':String,
    'AccessKeySecret':String
});

module.exports=mongoose.model('Config',produtSchema,'configs');