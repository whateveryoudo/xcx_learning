/**
 * Created by Administrator on 2017/10/15.
 */
import api from '../config/api'

export const getYdReqId = (params,cb,fail_cb) => api('/mobile/session',params,cb,fail_cb);//获取随机的请求id
export const sendYdMsg = (params,cb,fail_cb) => api('/mobile/message',params,cb,fail_cb);

export const toYdLogin = (params,cb,fail_cb) => api('/mobile/login',params,cb,fail_cb);//登陆移动
export const getYdCaptcha = (params,cb,fail_cb) => api('/mobile/captcha',params,cb,fail_cb);//查询获取图形验证码
export const sendYdSearchMsg = (params,cb,fail_cb) => api('/mobile/sms',params,cb,fail_cb);//查询获取短信验证码
export const toYdSearch = (params,cb,fail_cb) => api('/mobile/verify',params,cb,fail_cb);//查询详单



