const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Users=require('../models/users');


//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/enroll');

mongoose.connection.on('connected',function(){
    console.log('Mongodb connected success')
})

mongoose.connection.on('disconnected',function(){
    console.log("MonogDb connected disconnected")
});

router.get('/',function(req,res,next){
    Users.find({},(err,doc)=>{
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    })
});



module.exports=router;