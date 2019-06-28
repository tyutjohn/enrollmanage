const mongoose=require('mongoose');

var adminSchema=new mongoose.Schema({
    'id':String,
    'name':String,
    'phone':String,
    'pwd':String,
    'department':String,
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