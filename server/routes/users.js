const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/users');
const Department = require('../models/department');
const Configs = require('../models/config');
//阿里云短信
const SMSClient = require('@alicloud/sms-sdk')
const accessKeyId = 'LTAIyUpZ2UVjWtk1'//你自己在阿里云后台的accessKeyId
const secretAccessKey = 'CnYLyTpe1dAl5gL9eCfoPrpkLvPhiA'//secretAccessKey
var sendmsg = {};

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/enroll');

mongoose.connection.on('connected', function () {
  console.log('Mongodb connected success')
})

mongoose.connection.on('disconnected', function () {
  console.log("MonogDb connected disconnected")
});

//查询阿里云配置接口
Configs.find({}, {
  AccessKeyId: 1,
  AccessKeySecret: 1
}, (err, doc) => {
  if (err) {
    console.log(err.message)
  } else {
    var AccessKeySecret = '',
      AccessKeyId = '';
    doc.forEach((item, index) => {
      AccessKeyId = item.AccessKeyId;
      AccessKeySecret = item.AccessKeySecret;

    })
  }
})

//发送短信
Users.find({},(err,doc)=>{
  if(err){
    console.log(err)
  }else{
   doc.forEach((item)=>{
       //console.log(item.name);
       console.log(item.phone+',');
    })
  }
})
router.post('/sendmsg',(req,res,next)=>{
  sendmsg.send = async (ctx, next) =>{
    var name=req.body.name,
    time=req.body.time,
    phones=req.body.phones;
    //初始化sms_client
    let smsClient = new SMSClient({accessKeyId, secretAccessKey})
    //发送短信
    var s = await smsClient.sendSMS({
        PhoneNumbers: phones,//发送的电话号码
        SignName: '易班招新报名',//认证签名
        TemplateCode: 'SMS_160625180',//模板id
        TemplateParam: '{"name":"'+name+'","time":"'+time+'"}'//特别注意，这里的参数名
    })
    if(s.Code=="OK"){
        //ctx.body = {code :1,msg :number};
        res.json({
          status:'0',
          msg:'发送成功',
          result:''
        })
    }else{
        //ctx.body = {code :0};
        res.json({
          status:'1',
          msg:'发送失败',
          result:''
        })
    }
  }
  sendmsg.send();
});

//全部报名个人信息
router.get('/', function (req, res, next) {
  Users.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
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
});

//各个部门报名的信息
router.get('/classify', (req, res, next) => {
  const department = req.body.department;
  Users.find({
    department: department
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
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

//报名接口
router.post('/apply', (req, res, next) => {
  const param = new Users({
    name: req.body.name,
    sex: req.body.sex,
    class: req.body.class,
    major: req.body.major,
    phone: req.body.phone,
    schoolNum: req.body.schoolNum,
    introduce: req.body.introduce,
    department: req.body.department,
    department2: req.body.department2
  });

  const phone = req.body.phone;
  const name = req.body.name;
  const sex = req.body.sex;
  const Sclass = req.body.class;
  const major = req.body.major;
  const schoolNum = req.body.schoolNum;
  const introduce = req.body.introduce;
  const department = req.body.department;
  if (!name == '') {
    if (!phone == '') {
      if (!sex == '') {
        if (!Sclass == '') {
          if (!major == '') {
            if (!schoolNum == '') {
              if (!introduce == '') {
                if (!department == '') {
                  Users.find({
                    phone: phone
                  }, (err, doc) => {
                    if (doc.length > 0) {
                      res.json({
                        status: '1001',
                        msg: '该手机号已经报名',
                        result: ''
                      })
                    } else {
                      param.save((err, docs) => {
                        if (err) {
                          res.json({
                            status: '1',
                            msg: err.message,
                            result: ''
                          })
                        } else {
                          res.json({
                            status: '0',
                            msg: '报名成功',
                            result: ''
                          })
                        }
                      })
                    }
                  })
                } else {
                  res.json({
                    status: '1001',
                    msg: '未填写志愿',
                    result: ''
                  })
                }
              } else {
                res.json({
                  status: '1001',
                  msg: '未填写个人介绍',
                  result: ''
                })
              }
            } else {
              res.json({
                status: '1001',
                msg: '未填写学号',
                result: ''
              })
            }
          } else {
            res.json({
              status: '1001',
              msg: '未填写专业',
              result: ''
            })
          }
        } else {
          res.json({
            status: '1001',
            msg: '未填写班级',
            result: ''
          })
        }
      } else {
        res.json({
          status: '1001',
          msg: '未填写性别',
          result: ''
        })
      }
    } else {
      res.json({
        status: '1001',
        msg: '未填写手机号',
        result: ''
      })
    }
  } else {
    res.json({
      status: '1001',
      msg: '未填写姓名',
      result: ''
    })
  }
})

//部门信息
router.get('/departments', (req, res, next) => {
  Department.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc,
        }
      })
    }
  })
});



module.exports = router;
