/*
 * @Author: johnwang
 * @since: 2019-10-24 09:06:30
 * @lastTime: 2019-10-24 09:09:43
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const db = require('../config/mongodb').mongoURI;
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect(db);

mongoose.connection.on('connected', function () {
  console.log('Mongodb connected success')
})

mongoose.connection.on('disconnected', function () {
  console.log("MonogDb connected disconnected")
});

module.exports=mongoose;