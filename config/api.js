/**
 * Created by Administrator on 2017/10/26.
 */

import {$wuxToast,$wuxLoading} from '../components/wux'
import {apiPrefix} from './env'
/* fnName
 * @param
 * @desc 简易封装wx网络请求(这里默认post请求)
 */
export default (url,paramsList = {},cb,failCb) => {
    let type = paramsList.type || 'POST',
        data = paramsList.data || {},
        isLoading = typeof paramsList.isLoading == 'boolean' ? paramsList.isLoading : true;
        type == 'GET' && function(){//get 拼接参数(微信自己会拼接参数)
            let paramStr = '';
            if(paramsList.isRestful){
                Object.keys(data).forEach(key => {
                    paramStr += data[key];
                })
                url = url + paramStr;
                data = {};//清空参数
            }else{
                Object.keys(data).forEach(key => {
                    paramStr += key + '=' + data[key] +'&';
                })
                if(paramStr !== ''){//凭借到url后面
                    paramStr = paramStr.substr(0,paramStr.lastIndexOf('&'));
                    url = url + '?' + paramStr;
                }
            }

        }();
    if(isLoading){
        //调用自定义loading组件
        $wuxLoading.show({
            type : 'loading',
            timer: 1500,
            color: '#fff',
            text: paramsList.loadingText || '加载中...'
        });
    }
    //微信请求
    wx.request({
        url: apiPrefix + url, //仅为示例，并非真实的接口地址
        data: data,
        method : type,
        header: {//为什么这样写才能返回数据??
            "Content-Type": "application/json"
        },
        success: function(res) {//某些接口无状态码 这里不做请求错误的判断
            $wuxLoading.hide();
            res = res.data;
            if(res.code == 200){
                typeof cb === 'function' && cb(res);
            }else{//提示错误
                $wuxToast.show({
                    type: 'cancel',
                    timer: 1500,
                    color: '#fff',
                    text: res.msg || '服务器异常...',
                    success: () => {typeof failCb == 'function' && failCb()}
                })
            }
        },
        fail : function(){
            $wuxLoading.hide();
                $wuxToast.show({
                    type: 'cancel',
                    timer: 1500,
                    color: '#fff',
                    text: '服务器异常...',
                    success: () => {typeof failCb == 'function' && failCb()}
                })
        }
    })

}

