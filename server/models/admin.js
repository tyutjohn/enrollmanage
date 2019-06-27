const mongoose=require('mongoose');

var adminSchema=new mongoose.Schema({
    'id':String,
    'name':String,
    'phone':Number,
    'pwd':String,
    'department':String,
    'accesstoken':String,
    'rank':String
});

module.exports=mongoose.model('Admin',adminSchema,'admins');