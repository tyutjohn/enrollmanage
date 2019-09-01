/*
 * @Author: johnwang
 * @since: 2019-05-21 10:24:22
 * @lastTime: 2019-08-31 23:27:30
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var produtSchema=new Schema({
    'id':String,
    'name':{type:String,trim:true},
    'sex':{type:String,trim:true},
    'class':{type:Number,trim:true},
    'major':{type:String,trim:true},
    'schoolNum':{type:Number,trim:true},
    'introduce':{type:String,trim:true},
    'department':{type:String,trim:true},
    'department2':{type:String,trim:true},
    'state':String,
    'score':{type:Number,trim:true},
    'evaluate':{type:String,trim:true},
    'state2':String,
    'pass':String,
    'phone':{type:String,trim:true},
    'campus':{type:String,trim:true}
});

module.exports=mongoose.model('User',produtSchema,'users');