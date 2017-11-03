var appInstance = getApp();
import {getYdReqId,sendYdMsg,toYdLogin} from '../../../service/getData'
import {verifyRules} from '../../../plugin/js/verifyRules'
import {$wuxToast} from '../../../components/wux'
Page({
  data: {
      userInfo : {
          name : '',
          username: '',
          mail : "",
          message : '',
      },
      sendBtnText : '发送验证码',
      sendBtnIsAbleClick : true,
      timer : null,
      reqId : '',//用户随机窜
      count : 59,
      isAdd : false,
      //验证规则
      verifyRule : {
          name: {
              required: true,
              minlength: 2,
              maxlength: 10,
          },
          username : {
              required: true,
              tel: true,
          },
          message : {
              required: true
          },
          mail : {
              required: true,
              email : true
          }
      },
      //验证规则对应的提示信息
      verifyMsg : {
          name: {
              required: '请填写您的姓名'
          },
          username : {
              required: '请填写您的手机号'
          },
          message : {
              required: '请填写验证码'
          },
          mail : {
              required: '请填写你的邮箱'
          }
      },
      btnText : '发送验证码',
      loading : false,
      disabled : true
    },
    //无双向绑定处理
    bindKeyInput(e){
        e.detail.value && (this.data.userInfo[e.target.dataset.type] = e.detail.value);//不用setData
    },
    onLoad(){
        //获取随机reqId
        getYdReqId({
            isLoading : false,
            data : {}
        },res => {
            res.data.reqId && this.setData({reqId:res.data.reqId});
        })
        //初始化表单验证
        this.wxValidate = appInstance.wxValidate(this.data.verifyRule,this.data.verifyMsg);
    },
    //发送验证码(这里无法获取整个表单字段对象,自己手动验证)
    sendMsg(){
        const  that = this;
        if(!that.data.sendBtnIsAbleClick){return}
            //验证手机号是否符合
            if(verifyRules.phone(that.data.userInfo.username)){
                //这里去发送验证码
                sendYdMsg({
                    type : 'POST',
                    loadingText : '短信发送中...',
                    data : {
                        phone : that.data.userInfo.username,
                        reqId : that.data.reqId
                    }
                },sendSuc);
            }
        function sendSuc(res){
            that.data.timer = setInterval(() => {
                that.data.count--;
                if(that.data.count <= 0){
                    that.setData({
                        sendBtnIsAbleClick : true,
                        sendBtnText : '重新发送',
                        count : 59
                    })
                    clearInterval(that.data.timer);
                }else{
                    that.setData({
                        sendBtnIsAbleClick : false,
                        sendBtnText : '重新发送' + '(' + that.data.count + 's)',
                    })
                }
            },1000)
        }
    },
    formSubmit(e){
        const that = this;
      if(!this.wxValidate.checkForm(e)){
        const error = this.wxValidate.errorList[0];
          appInstance.$wuxToast.show({
              type: 'cancel',
              timer: 1500,
              color: '#fff',
              text: error.msg
          })
          return false;
      };
      let reqParam = Object.assign(e.detail.value,{reqId : that.data.reqId});
        //移动登录
        toYdLogin({
            type : 'POST',
            loadingText : '登录中...',
            data : reqParam
        },loginSuc);
        //登录成功
        function loginSuc(res) {
            //调用自定义loading组件
            $wuxToast.show({
                type : 'success',
                timer: 1500,
                color: '#fff',
                text: '登录成功',
                success(){
                    setTimeout(() =>{
                        //跳转查询界面
                        wx.navigateTo({//跳转移动业务查询(将手机号与reqId传入页面)
                            url: 'ydLogin/ydLogin'
                        })
                    })
                }
            });
        }
    }
})
