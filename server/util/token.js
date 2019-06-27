const jwt=require('jsonwebtoken')

//密钥
const secret='THISISTEST'

//生成token
const createToken=(username,pwd,expires,strTimer)=>{
    let token=jwt.sign({
        User:username,
        Pwd:pwd
    },secret,{
        expiresIn:expires+" "+strTimer
    });
    return token;
}

//验证token
const verifyToken=(_token)=>{
    let verify=jwt.verify(_token,secret,(error,decoded)=>{
        if(error){
            return "Token Invalid";
        }
        return decoded;
    });
    return verify;
};

exports.createToken=createToken;
exports.verifyToken=verifyToken;
exports.secret=secret;
