const SMSClient = require('@alicloud/sms-sdk')
const accessKeyId = 'LTAIyUpZ2UVjWtk1'//你自己在阿里云后台的accessKeyId
const secretAccessKey = 'CnYLyTpe1dAl5gL9eCfoPrpkLvPhiA'//secretAccessKey
var sendmsg = {};
module.exports = sendmsg;
/**
 * 发送短信验证码
 */
sendmsg.send = async (ctx, next) =>{
    var number="";
    for(var i=0;i<6;i++){
        number+=Math.floor(Math.random()*10)
    }
    //初始化sms_client
    let smsClient = new SMSClient({accessKeyId, secretAccessKey})
    //发送短信
    var s = await smsClient.sendSMS({
        PhoneNumbers: '15503676579',//发送的电话号码
        SignName: '易班招新报名',//认证签名
        TemplateCode: 'SMS_160625180',//模板id
        TemplateParam: '{"name":"'+number+'","time":"2019"}'//特别注意，这里的参数名
    })
    if(s.Code=="OK"){
        ctx.body = {code :1,msg :number}
    }else{
        ctx.body = {code :0}
    }
};
