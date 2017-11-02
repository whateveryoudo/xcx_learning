/**
 * Created by Administrator on 2017/10/15.
 */
import api from '../../config/api'

export const getYdReqId = (params,cb,fail_cb) => api('/mobile/session',params,cb,fail_cb);//获取随机的请求id
export const sendYdMsg = (params,cb,fail_cb) => api('/mobile/message',params,cb,fail_cb);

export const toLogin = (params) => api('/mobile/login',params,'post')//登陆移动
export const getSms = (reqId,phone) => api('/mobile/sms',{//获取查询的短信验证码
    reqId,
    phone
},'post')
export const getCaptcha = (reqId) => api('/mobile/captcha',{//获取图形验证码
    reqId
},'post',false)

export const toSearch = (params) => api('/mobile/verify',params,'post')//登陆移动


