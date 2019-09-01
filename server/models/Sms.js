/*
 * @Author: johnwang
 * @since: 2019-05-22 15:29:40
 * @lastTime: 2019-08-31 22:24:47
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var produtSchema=new Schema({
    'SignName':{type:String,trim:true},
    'TemplateCode':{type:String,trim:true},
    'state':String,
    'describe':{type:String,trim:true}
});

module.exports=mongoose.model('Sms',produtSchema,'Sms');