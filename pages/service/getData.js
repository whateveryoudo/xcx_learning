/**
 * Created by Administrator on 2017/10/15.
 */
import axios from '@/config/axios'
export const getLoginMsg = (reqId,phone) => axios('/mobile/message',{//获取登陆验证码
    reqId,
    phone
},'post')

export const toLogin = (params) => axios('/mobile/login',params,'post')//登陆移动
export const getSms = (reqId,phone) => axios('/mobile/sms',{//获取查询的短信验证码
    reqId,
    phone
},'post')
export const getCaptcha = (reqId) => axios('/mobile/captcha',{//获取图形验证码
    reqId
},'post',false)

export const toSearch = (params) => axios('/mobile/verify',params,'post')//登陆移动

export const getReqid = () => axios('/mobile/session',{},'post',false);//获取随机的请求id
