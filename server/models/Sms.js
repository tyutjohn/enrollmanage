const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var produtSchema=new Schema({
    'SignName':String,
    'TemplateCode':String,
    'state':String
});

module.exports=mongoose.model('Sms',produtSchema,'Sms');