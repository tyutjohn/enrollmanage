const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var produtSchema=new Schema({
    'department_id':String,
    'department_name':String
});

module.exports=mongoose.model('Department',produtSchema,'departments');