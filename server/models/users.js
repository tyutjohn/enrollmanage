const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var produtSchema=new Schema({
    'id':String,
    'name':String,
    'sex':String,
    'class':Number,
    'major':String,
    'schoolNum':Number,
    'introduce':String,
    'department':Number,
    'department2':Number,
    'state':String,
    'score':Number,
    'evaluate':String,
    'state2':String,
    'pass':Boolean,
    'phone':String
});

module.exports=mongoose.model('User',produtSchema,'users');