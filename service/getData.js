/**
 * Created by Administrator on 2017/10/15.
 */
import api from '../config/api'
/**********移动接口***********/
// export const sendYdMsg = (params,cb,fail_cb) => api('/mobile/message',params,cb,fail_cb);
export const sendYdMsg = (reqId,phone) => api('/mobile/message',{//获取登陆验证码
    reqId,
    phone
},'post')

export const toLogin = (params) => api('/mobile/login',params,'post')//登陆移动
export const getSms = (reqId,phone) => api('/mobile/sms',{//获取查询的短信验证码
    reqId,
    phone
},'post')
export const getCaptcha = (reqId) => api('/mobile/captcha',{//获取图形验证码
    reqId
},'post',false)

export const toSearch = (params) => api('/mobile/verify',params,'post')//登陆移动

export const getReqid = () => api('/mobile/session',{},'post',false);//获取随机的请求id

/**********电信接口***********/
export const getDxReqid = () => api('/telecom/session',{},'post',false);//获取随机的请求id

export const getDxLoginMsg = (reqId,phone) => api('/mobile/message',{//获取登陆验证码
    reqId,
    phone
},'post')

export const toDxLogin = (params) => api('/mobile/login',params,'post')//登陆移动
export const getDxSms = (reqId,phone) => api('/mobile/sms',{//获取查询的短信验证码
    reqId,
    phone
},'post')
export const getDxCaptcha = (reqId) => api('/mobile/captcha',{//获取图形验证码
    reqId
},'post',false)

export const toDxSearch = (params) => api('/mobile/verify',params,'post')//登陆移动