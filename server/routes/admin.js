const express = require('express');
const router = express.Router();
const Admin = require('./../models/admin');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
const Sms = require('../models/Sms');
const mongoose = require('mongoose');
const Config=require('./../models/config');
const token=require('../util/token');
const jwt=require('jsonwebtoken');
const Department = require('../models/department');

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
  res.cookie('username', '', {
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
          'pwd':pwd
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

//删除管理员
router.post('/AdminDelete',(req,res,next)=>{
  let id=mongoose.Types.ObjectId(req.body.id);
  Admin.findOneAndRemove({
    '_id':id
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'0',
        msg:'删除成功'
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

//获取禁用管理员列表
router.get('/GetUnadmin',(req,res,next)=>{
  Admin.find({
    state:'1'
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'0',
        msg:'suc',
        result:{
          count:doc.length,
          list:doc
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
router.post('/SmsPushModel',(req,res,next)=>{
  var param = new Sms({
    SignName: req.body.SignName,
    TemplateCode: req.body.TemplateCode,
    describe:req.body.describe,
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

//修改短信模块
router.post('/SmsInfoModel',(req,res,next)=>{
  let id=mongoose.Types.ObjectId(req.body.id),
      SignName=req.body.SignName,
      TemplateCode=req.body.TemplateCode,
      describe=req.body.describe;
  Sms.find({
    '_id':id
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      Sms.update({
        '_id':id
      },{
        $set:{
          'SignName':SignName,
          'TemplateCode':TemplateCode,
          'describe':describe
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
            msg:'短信模块修改成功'
          })
        }
      })
    }
  })
})

//禁用短信模板
router.post('/SmsDisModel', (req, res, next) => {
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
                    msg:'模块禁用成功',
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

//删除短信模板
router.post('/SmsDelModel',(req,res,next)=>{
  let id=mongoose.Types.ObjectId(req.body.id);
  Sms.findOneAndRemove({
    '_id':id
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'0',
        msg:'删除成功'
      })
    }
  })
})

//获取配置表
router.get('/getconfig',(req,res,next)=>{
  Config.find({},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'0',
        msg:'suc',
        result:{
          list:doc
        }
      })
    }
  })
})

//修改阿里云ak
router.post('/UpdataAliunAk',(req,res,next)=>{
  let AccessKeyId=req.body.AccessKeyId,
      AccessKeySecret=req.body.AccessKeySecret,
      id=mongoose.Types.ObjectId(req.body.id);
  Config.find({
    '_id':id
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      Config.update({
        '_id':id
      },{
        $set:{
          'AccessKeyId':AccessKeyId,
          'AccessKeySecret':AccessKeySecret
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
            msg:'阿里云配置修改成功'
          })
        }
      })
    }
  })
})

//增加部门信息
router.post('/AddDepartinfor',(req,res,next)=>{
  let param=new Department({
    department_name:req.body.department_name,
    department_id:req.body.department_id,
    department_qq:req.body.department_qq
  });

  Department.find(param,(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      if(doc.length>0){
        res.json({
          status:'1001',
          msg: '已经存在该数据',
              result: {
                list: doc
              }
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
              msg:'部门添加成功'
            })
          }
        })
      }
    }
  })
})

//修改部门信息
router.post('/infoDepartmation',(req,res,next)=>{
  let department_name=req.body.department_name,
      department_qq=req.body.department_qq,
      department_id=req.body.department_id,
      id=mongoose.Types.ObjectId(req.body.id);
  Department.findOne({
    '_id':id
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      Department.update({
        '_id':id
      },{
        $set:{
          'department_name':department_name,
          'department_qq':department_qq,
          'department_id':department_id
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
            msg:'修改信息成功'
          })
        }
      })
    }
  })
})

//删除部门信息
router.post('/DeleteDepart',(req,res,next)=>{
  let id=mongoose.Types.ObjectId(req.body.id);
  Department.findOneAndRemove({
    '_id':id
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'0',
        msg:'删除成功'
      })
    }
  })
})

//修改系统报名时间
router.post('/UpdateEnrollTime',(req,res,next)=>{
  let id=mongoose.Types.ObjectId(req.body.id),
      signuptime=req.body.signuptime,
      signdowntime=req.body.signdowntime,
      queryuptime=req.body.queryuptime,
      querydowntime=req.body.querydowntime;
  Config.find({
    '_id':id
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      Config.update({
        '_id':id
      },{
        $set:{
          'signuptime':signuptime,
          'signdowntime':signdowntime,
          'queryuptime':queryuptime,
          'querydowntime':querydowntime
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
            msg:'修改成功',
            result:docs
          })
        }
      })
    }
  })
})

//测试接口
router.post('/test',(req,res,next)=>{
  
})
module.exports = router;