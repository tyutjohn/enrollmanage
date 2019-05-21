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
    'department':String,
    'department2':String,
    'state':Number,
    'score':Number,
    'evaluate':String,
    'state2':Number,
    'pass':Number
});

module.exports=mongoose.model('User',produtSchema,'users');