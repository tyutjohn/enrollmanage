/*
 * @Author: johnwang
 * @since: 2019-05-21 18:40:05
 * @lastTime: 2019-08-31 23:08:39
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const mongoose=require('mongoose');

var adminSchema=new mongoose.Schema({
    'id':String,
    'name':{type:String,trim:true},
    'phone':{type:String,trim:true},
    'pwd':String,
    'department':{type:String,trim:true,index:true},
    'accesstoken':String,
    'rank':String,
    'create_time':{type:Date,default:Date.now},
    'update_time':{type:Date,default:Date.now},
    'delete_time':{type:Date},
    'state':String
},{
    versionKey: false,
    timestamps: { createdAt: 'create_time', updatedAt: 'update_time' }
});

module.exports=mongoose.model('Admin',adminSchema,'admins');