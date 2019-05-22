const express=require('express');
const router=express.Router();
const Admin=require('./../models/admin');
const crypto=require('crypto');
const md5=crypto.createHash('md5');

//管理员个人信息
router.get('/',(req,res,next)=>{
    Admin.find({},(err,doc)=>{
        if(err){
            res.json({
                ststus:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    status:'0',
                    msg:'',
                    result:{
                        count:doc.length,
                        list:doc
                    }
                }
            })
        }
    })
})

//管理员登陆
router.post('/login',(req,res,next)=>{
    var param={
        name:req.body.name,
        pwd:req.body.pwd
    }
    Admin.findOne(param,(err,doc)=>{
            if(doc){
                // res.cookie("userId",md5.update(doc.id*Math.random(1000)).digest('hex'),{
                    let cookienum=md5.update(doc.id).digest('hex')
                    res.cookie("userId",cookienum,{
                    path:'/',
                    maxAge:1000*60*60
                });
                //req.session.user = doc;
                res.json({
                    status:'0',
                    msg:'success',
                    result:{
                        userName:doc.name
                    }
                });
            }else{
                res.json({
                    status:'1001',
                    msg:'用户名或密码错误',
                    result:''
                })
            }
    })
})

//管理员退出
router.post('/logout',(req,res,next)=>{
    res.cookie('userId','',{
        path:'/',
        maxAge:-1
    });
    res.json({
        status:'0',
        msg:'退出成功',
        result:{
            data:'退出成功'
        }
    })
});

module.exports=router;