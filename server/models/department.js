/*
 * @Author: johnwang
 * @since: 2019-05-22 13:09:54
 * @lastTime: 2019-05-22 13:09:54
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var produtSchema=new Schema({
    'department_id':{type:String,trim:true},
    'department_name':{type:String,trim:true},
    'department_qq':{type:String,trim:true}
});

module.exports=mongoose.model('Department',produtSchema,'departments');