const express = require('express');
const router = express.Router();
const Admin = require('./../models/admin');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
const Sms = require('../models/Sms');
const mongoose = require('mongoose');
const Config=require('./../models/config');
const token=require('../util/token');
const jwt=require('jsonwebtoken')

//管理员个人信息
router.get('/', (req, res, next) => {
  Admin.find({
    'state':'0'
  }, (err, doc) => {
    if (err) {
      res.json({
        ststus: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

//管理员登陆后个人信息
router.post('/adminone',(req,res,next)=>{
  let admin=req.body.username;
  Admin.findOne({'name':admin},(err,doc)=>{
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
          list:doc
        }
      })
    }
  })
})

//管理员登陆
router.post('/login', (req, res, next) => {
  let accesstoken=token.createToken(req.body.name,req.body.pwd,'1','hour');
  let param = {
    name: req.body.name,
    pwd: req.body.pwd
  }
  Admin.findOne(param, (err, doc) => {
    if (doc) {
      // let cookienum = md5.update(doc.id).digest('hex')
      // res.cookie("userId", cookienum, {
      //   path: '/',
      //   maxAge: 2000 * 60 * 60
      // });
      //req.session.user = doc;
      Admin.update({
        'name':req.body.name
      },{
        $set:{
          'accesstoken':accesstoken
        }
      },(err,docs)=>{
        if(err){
          res.json({
            status:'1',
            msg:err.message
          })
        }else{
          res.json({
            status:'0',
            msg:'登陆成功',
            result:{
              list:docs,
              token:accesstoken,
              userName: doc.name
            }
          })
        }
      })
      console.log(accesstoken);
    } else {
      res.json({
        status: '1001',
        msg: '用户名或密码错误',
        result: ''
      })
    }
  })
})

//检验token
router.post('/checktoken',(req,res,next)=>{
  let username=req.body.username,
      accesstoken=req.body.token;
  Admin.findOne({
    'name':username,
    'accesstoken':accesstoken
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
        let secret=token.secret;
        jwt.verify(accesstoken,secret,(err,docs)=>{
          if(err){
            res.json({
              status:'1',
              msg:'验证失败',
              result:{
                err:err.message
              }
            })
          }else{
            res.json({
              status:'0',
              msg:'校验成功',
              result:{
                list:docs,
              }
            })
          }
        })
    }
  })
})

//管理员退出
router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: '0',
    msg: '退出成功',
    result: {
      data: '退出成功'
    }
  })
});

//添加管理员
router.post('/addadmin',(req,res,next)=>{
  const param=new Admin({
    name:req.body.name,
    phone:req.body.phone,
    pwd:req.body.pwd,
    department:req.body.department,
    rank:req.body.rank,
    state:'0'
  });

  Admin.find({
    phone:req.body.phone,
    name:req.body.name
  },(err,doc)=>{
    if(doc.length>0){
      res.json({
        status:'1001',
        msg:'该用户已经注册'
      })
    }else{
      param.save((err,docs)=>{
        if(err){
          res.json({
            status:'1',
            msg:err.message
          })
        }else{
          res.json({
            status:'0',
            msg:'注册成功'
          })
        }
      })
    }
  })
})

//修改管理员信息
router.post('/alteradmin',(req,res,next)=>{
  let name=req.body.name,
      phone=req.body.phone,
      department=req.body.department,
      rank=req.body.rank
  Admin.findOne({
    'phone':phone
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      Admin.update({
        'phone':phone
      },{
        $set:{
          'name':name,
          'department':department,
          'phone':phone,
          'rank':rank
        }
      },(err,docs)=>{
        if(err){
          res.json({
            status:'1',
            msg:err.message
          })
        }else{
          res.json({
            status:'0',
            msg:'修改成功'
          })
        }
      })
    }
  })
})

//修改管理员密码
router.post('/alteradminpwd',(req,res,next)=>{
  let pwd=req.body.pwd,
      phone=req.body.phone
  Admin.findOne({
    'phone':phone
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      Admin.update({
        'phone':phone
      },{
        $set:{
          'phone':phone
        }
      },(err,docs)=>{
        if(err){
          res.json({
            status:'1',
            msg:err.message
          })
        }else{
          res.json({
            status:'0',
            msg:'密码修改成功'
          })
        }
      })
    }
  })
})

//禁用管理员
router.post('/deleteadmin',(req,res,next)=>{
  Admin.findOne({
    'name':req.body.name
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      Admin.update({
        'name':req.body.name
      },{
        $set:{
          'state':'1',
          'delete_time':Date.now()
        }
      },(err,docs)=>{
        if(err){
          res.json({
            status:'1',
            msg:err.message
          })
        }else{
          res.json({
            status:'0',
            msg:'管理员已经禁用'
          })
        }
      })
    }
  })
})

//解禁管理员
router.post('/undeleteadmin',(req,res,next)=>{
  Admin.findOne({
    'name':req.body.name
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      Admin.update({
        'name':req.body.name
      },{
        $set:{
          'state':'0',
        }
      },(err,docs)=>{
        if(err){
          res.json({
            status:'1',
            msg:err.message
          })
        }else{
          res.json({
            status:'0',
            msg:'管理员已经解禁'
          })
        }
      })
    }
  })
})

//获取短信模板
router.get('/SmsConfig', (req, res, next) => {
  Sms.find({
    state: '0'
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: 'suc',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

//添加短信模板
router.post('/SmsPushModel', (req, res, next) => {
  var param = new Sms({
    SignName: req.body.SignName,
    TemplateCode: req.body.TemplateCode,
    state: '0'
  });

  var SignName = req.body.SignName;
  var TemplateCode = req.body.TemplateCode;
  if (!SignName == '') {
    if (!TemplateCode == '') {
      Sms.find(param, (err, doc) => {
        if (err) {
          res.json({
            status: '1',
            msg: err.message
          })
        } else {
          if (doc.length > 0) {
            res.json({
              status: '1001',
              msg: '已经存在该数据',
              result: {
                list: doc
              }
            })
          } else {
            param.save((err, docs) => {
              if (err) {
                res.json({
                  status: '1',
                  msg: err.message
                })
              } else {
                res.json({
                  status: '0',
                  msg: '模板添加成功',
                  result: ''
                })
              }
            })
          }
        }
      })
    } else {
      res.json({
        status: '1001',
        msg: '未填写模块Code'
      })
    }
  } else {
    res.json({
      status: '1001',
      msg: '未填写短信签名名称'
    })
  }

})

//删除短信模板
router.post('/SmsDelModel', (req, res, next) => {
  var SmsId = req.body.id;
  var id = mongoose.Types.ObjectId(SmsId);
  Sms.findOne({
    "_id": id
  }, (err, docs) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (!docs == '') {
        Sms.update({'_id':id},{$set:{'state':'1'}},(err,docss)=>{
            if(err){
                res.json({
                    status:'1',
                    msg:err.message
                })
            }else{
                res.json({
                    status:'0',
                    msg:'模块删除成功',
                    result:''
                })
            }
        })
      }else{
        res.json({
            status: '1001',
            msg: '模板不存在',
            result: docs
          })
      }
    }
  })
})

//修改阿里云ak
router.post('/updatealiunAk',(req,res,next)=>{
  var param={
    AccessKeyId:req.body.AccessKeyId,
    AccessKeySecret:req.body.AccessKeySecret
  };
  // Config.update(param,)
})

//测试接口
router.post('/test',(req,res,next)=>{
  
})
module.exports = router;
