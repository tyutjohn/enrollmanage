/*
 * @Author: johnwang
 * @since: 2019-05-22 13:46:43
 * @lastTime: 2019-05-22 13:46:43
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const mongoose=require('mongoose');

var produtSchema=new mongoose.Schema({
    'AccessKeyId':{type:String,trim:true},
    'AccessKeySecret':{type:String,trim:true},
    'queryuptime':Number,
    'querydowntime':Number,
    'signuptime':Number,
    'signdowntime':Number
});

module.exports=mongoose.model('Config',produtSchema,'configs');