const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/users');
const Department = require('../models/department');
const Configs = require('../models/config');
//阿里云短信
const SMSClient = require('@alicloud/sms-sdk')
var sendmsg = {};

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/enroll');

mongoose.connection.on('connected', function () {
  console.log('Mongodb connected success')
})

mongoose.connection.on('disconnected', function () {
  console.log("MonogDb connected disconnected")
});

//发送短信接口
router.post('/sendmsg', (req, res, next) => {
  //查询阿里云配置接口
  Configs.find({}, {
    AccessKeyId: 1,
    AccessKeySecret: 1
  }, (err, doc) => {
    if (err) {
      console.log(err.message)
    } else {
      var secretAccessKey = '',
        accessKeyId = '';
      doc.forEach((item, index) => {
        accessKeyId = item.AccessKeyId;
        secretAccessKey = item.AccessKeySecret;

        sendmsg.send = async (ctx, next) => {
          var time = req.body.time,
            phones = req.body.phones,
            SignName = req.body.SignName,
            TemplateCode = req.body.TemplateCode,
            str = phones.split(',');
          //初始化sms_client
          let smsClient = new SMSClient({
            accessKeyId,
            secretAccessKey
          })
          if (!phones == '') {
            if (!SignName == '') {
              if (!TemplateCode == '') {
                if (!time == '') {
                  //发送短信
                  var s = await smsClient.sendSMS({
                    PhoneNumbers: phones, //发送的电话号码
                    SignName: SignName, //认证签名
                    TemplateCode: TemplateCode, //模板id
                    TemplateParam: '{"time":"' + time + '"}' //特别注意，这里的参数名
                  })
                  if (s.Code == "OK") {
                    for (let i = 0; i < str.length; i++) {
                      phones = str[i];
                      Users.update({
                        'phone': phones
                      }, {
                        $set: {
                          'state': '1'
                        }
                      }, (err, doc) => {
                        if (err) {
                          res.json({
                            status: "1",
                            msg: err.message
                          })
                        }
                      })
                    }
                    res.json({
                      status: '0',
                      msg: '发送成功',
                      result: ''
                    })
                  } else {
                    //ctx.body = {code :0};
                    res.json({
                      status: '1',
                      msg: '发送失败',
                      result: ''
                    })
                  }
                } else {
                  res.json({
                    status: '1001',
                    msg: '未选择面试时间'
                  })
                }
              } else {
                res.json({
                  status: '1001',
                  msg: '未选择短信模板'
                })
              }
            } else {
              res.json({
                status: '1001',
                msg: '未选择模板签名'
              })
            }
          } else {
            res.json({
              status: '1001',
              msg: '未选择发送的对象'
            })
          }
        }
        sendmsg.send();
      })
    }
  })
});

//全部报名个人信息
router.get('/', function (req, res, next) {
  Users.find({
    'state': '0'
  }, (err, doc) => {
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
    department: department,
    state: '0'
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
    department2: req.body.department2,
    campus: req.body.campus,
    state: '0',
    state2: '0'
  });

  const phone = req.body.phone;
  const name = req.body.name;
  const sex = req.body.sex;
  const Sclass = req.body.class;
  const major = req.body.major;
  const schoolNum = req.body.schoolNum;
  const introduce = req.body.introduce;
  const department = req.body.department;
  const campus = req.body.campus;
  if (!name == '') {
    if (!phone == '') {
      if (!sex == '') {
        if (!Sclass == '') {
          if (!major == '') {
            if (!schoolNum == '') {
              if (!introduce == '') {
                if (!department == '') {
                  if (!campus == '') {
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
                      msg: '校区未填写'
                    })
                  }
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

//打分台全部的报名信息
router.get('/mark', (req, res, next) => {
  Users.find({
    state: '1',
    state2: '0'
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        mag: err.message
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

//打分台各部门的报名信息
router.get('/markdepart', (req, res, next) => {
  const department = req.body.department;
  Users.find({
    department: department,
    state: '1',
    state2: '0'
  }, (err, doc) => {
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
})

//面试打分
router.post('/enrollScore', (req, res, next) => {
  var score = req.body.score;
  var evaluate = req.body.evaluate;
  var id = mongoose.Types.ObjectId(req.body.id);
  Users.findOne({
    '_id': id
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      Users.update({
        '_id': id
      }, {
        $set: {
          'score': score,
          'evaluate': evaluate,
          'state2': '1'
        }
      }, (err, docs) => {
        if (err) {
          res.json({
            status: '1',
            msg: err.message
          })
        } else {
          res.json({
            status: '0',
            msg: '打分成功',
            result: ''
          })
        }
      })
    }
  })
})

//延迟面试
router.post('/loading', (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.body.id);
  Users.findOne({
    '_id': id
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      Users.update({
        '_id': id
      }, {
        $set: {
          'state': '0'
        }
      }, (err, docs) => {
        if (err) {
          res.json({
            status: '1',
            msg: err.message
          })
        } else {
          res.json({
            status: '0',
            msg: '已经延迟面试'
          })
        }
      })
    }
  })
})

//调剂面试
router.post('/adjust', (req, res, next) => {
  var id = req.body.id;
  Users.find({
    '_id': id
  }, {
    department2: 1
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      var newdepartment = '';
      doc.forEach((item, index) => {
        newdepartment = item.department2;
        Users.update({
          '_id': id
        }, {
          $set: {
            'state': '0',
            'department': newdepartment,
            'department2': ''
          }
        }, (err, docs) => {
          if (err) {
            res.json({
              status: '1',
              msg: err.message
            })
          } else {
            res.json({
              status: '0',
              msg: '转部门成功'
            })
          }
        })
      })
    }
  })
})

//已经面试的全部信息
router.get('/ainterview', (req, res, next) => {
  Users.find({
    'state2': '1',
    'pass': ''
  }, (err, doc) => {
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
})

//已经面试的各部门的信息
router.get('/ainterdepart', (req, res, next) => {
  var department = req.body.department;
  Users.find({
    'state2': '1',
    'department': department,
    'pass': ''
  }, (err, doc) => {
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
})

//未录取短信通知
router.post('/sendmsgnopass', (req, res, next) => {
  //查询阿里云配置接口
  Configs.find({}, {
    AccessKeyId: 1,
    AccessKeySecret: 1
  }, (err, doc) => {
    if (err) {
      console.log(err.message)
    } else {
      var secretAccessKey = '',
        accessKeyId = '';
      doc.forEach((item, index) => {
        accessKeyId = item.AccessKeyId;
        secretAccessKey = item.AccessKeySecret;

        sendmsg.send = async (ctx, next) => {
          var phones = req.body.phones,
            SignName = req.body.SignName,
            TemplateCode = req.body.TemplateCode,
            str = phones.split(',');
          //初始化sms_client
          let smsClient = new SMSClient({
            accessKeyId,
            secretAccessKey
          })
          //发送短信
          var s = await smsClient.sendSMS({
            PhoneNumbers: phones, //发送的电话号码
            SignName: SignName, //认证签名
            TemplateCode: TemplateCode, //模板id
            TemplateParam: ''
          })
          if (s.Code == "OK") {
            for (let i = 0; i < str.length; i++) {
              phones = str[i];
              Users.updateOne({
                'phone': phones
              }, {
                $set: {
                  'pass': '0'
                }
              }, (err, doc) => {
                if (err) {
                  res.json({
                    status: "1",
                    msg: err.message
                  })
                }
              })
            }
            res.json({
              status: '0',
              msg: '发送成功',
              result: ''
            })
          } else {
            //ctx.body = {code :0};
            res.json({
              status: '1',
              msg: '发送失败',
              result: ''
            })
          }
        }
        sendmsg.send();
      })
    }
  })
})

//录取短信通知
router.post('/sendmsgpass', (req, res, next) => {
  //查询阿里云配置接口
  Configs.find({}, {
    AccessKeyId: 1,
    AccessKeySecret: 1
  }, (err, doc) => {
    if (err) {
      console.log(err.message)
    } else {
      var secretAccessKey = '',
        accessKeyId = '';
      doc.forEach((item, index) => {
        accessKeyId = item.AccessKeyId;
        secretAccessKey = item.AccessKeySecret;

        sendmsg.send = async (ctx, next) => {
          var phones = req.body.phones,
            SignName = req.body.SignName,
            TemplateCode = req.body.TemplateCode,
            str = phones.split(',');
          //初始化sms_client
          let smsClient = new SMSClient({
            accessKeyId,
            secretAccessKey
          })
          //发送短信
          var s = await smsClient.sendSMS({
            PhoneNumbers: phones, //发送的电话号码
            SignName: SignName, //认证签名
            TemplateCode: TemplateCode, //模板id
            TemplateParam: ''
          })
          if (s.Code == "OK") {
            for (let i = 0; i < str.length; i++) {
              phones = str[i];
              Users.updateOne({
                'phone': phones
              }, {
                $set: {
                  'pass': '1'
                }
              }, (err, doc) => {
                if (err) {
                  res.json({
                    status: "1",
                    msg: err.message
                  })
                }
              })
            }
            res.json({
              status: '0',
              msg: '发送成功',
              result: ''
            })
          } else {
            //ctx.body = {code :0};
            res.json({
              status: '1',
              msg: '发送失败',
              result: ''
            })
          }
        }
        sendmsg.send();
      })
    }
  })
})

//已经录取的全部信息
router.get('/admitall', (req, res, next) => {
  Users.find({
    'pass': '1'
  }, (err, doc) => {
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
})

//已经录取的各个部门的信息
router.get('/admitdepart', (req, res, next) => {
  var department = req.body.department;
  Users.find({
    'pass': '1',
    'department': department
  }, (err, doc) => {
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
})

//未录取的信息
router.get('/admitnopass', (req, res, next) => {
  Users.find({
    'pass': '0'
  }, (err, doc) => {
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
})

//查询结果
router.post('/userfind', (req, res, next) => {
  var name = req.body.name,
    phone = req.body.phone;
  if (!name == '') {
    if (!phone == '') {
      Users.find({
        phone
      }, (err, doc) => {
        if (err) {
          res.json({
            status: '1',
            msg: err.message
          })
        } else {
          if (doc.length > 0) {
            doc.forEach((item) => {
              if (item.pass == '0') {
                res.json({
                  status: '0',
                  msg: '很遗憾，您没有被我们录取，祝愿您以后的生活，学习愉快'
                });
              } else if (item.pass == '1') {
                var department = item.department;
                Department.find({
                  department_id: department
                }, (err, docs) => {
                  if (err) {
                    res.json({
                      status: '1',
                      msg: err.message
                    })
                  } else {
                    docs.forEach((item, index) => {
                      var qqNum = item.department_qq;
                      res.json({
                        status: '0',
                        msg: '恭喜您被我们录取，请加入群:' + qqNum + ',您的小伙伴已经在群里等你了',
                        result: {
                          list: docs
                        }
                      })
                    })
                  }
                })
              }
            });
          } else {
            res.json({
              status: '1001',
              msg: '未查询到该用户的信息，请确认手机号是否填写正确'
            })
          }
        }
      })
    } else {
      res.json({
        status: '1001',
        msg: '未填写手机号'
      })
    }
  } else {
    res.json({
      status: '1001',
      msg: '未填写姓名'
    })
  }
})

//test
router.post('/test', (req, res, next) => {

})



module.exports = router;
