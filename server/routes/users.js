const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/users');


//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/enroll');

mongoose.connection.on('connected', function () {
  console.log('Mongodb connected success')
})

mongoose.connection.on('disconnected', function () {
  console.log("MonogDb connected disconnected")
});

//报名个人信息
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

module.exports = router;
