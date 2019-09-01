/*
 * @Author: johnwang
 * @since: 2019-07-15 11:08:30
 * @lastTime: 2019-08-31 22:30:47
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const redis=require('redis');
const Redisconfig=require('../config/redis').redis
//连接redis数据库
const client=redis.createClient(Redisconfig.port,Redisconfig.url);
client.on("error",err=>{
  console.log('redis connect err',err);
});

client.on('connect',()=>{
  console.log('redis cocnnect success');
})

//验证redis
// client.auth(Redisconfig.password);

const redisHelper = {};

/**
 * redisHelper setString function
 * @param key
 * @param value
 * @param expire
 */
redisHelper.setString = (key, value, expire) => {
    return new Promise((resolve, reject) => {
        client.set(key, value, function (err, result) {

            if (err) {
                console.log(err);
                reject(err);
            }

            if (!isNaN(expire) && expire > 0) {
                client.expire(key, parseInt(expire));
            }
            resolve(result)
        })
    })
}

/**
 * redisHelper getString function
 * @param key
 */
redisHelper.getString = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, function (err, result) {
            if (err) {
                console.log(err);
                reject(err)
            }
            resolve(result)
        });
    })
}

module.exports = redisHelper;

