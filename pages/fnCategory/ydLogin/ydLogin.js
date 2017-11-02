var appInstance = getApp();
import {getYdReqId,sendYdMsg} from '../../service/getData'
import {verifyRules} from '../../../plugin/js/verifyRules'
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
      reqId : '',//用户随机穿
      count : 59,
      isAdd : false,
      verifyRule : {
          name: {
              required: true,
              minlength: 2,
              maxlength: 10,
          },
          username : {
              required: true,
              tel: true,
          }
      },
      verifyMsg : {
          name: {
              required: '请填写您的姓名'
          },
          username : {
              required: '请填写您的手机号'
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
        sendSuc();//这里直接调用
        return;
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
                debugger;
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
        console.log(e);
      if(!this.wxValidate.checkForm(e)){
        const error = this.wxValidate.errorList[0];
          appInstance.$wuxToast.show({
              type: 'cancel',
              timer: 1500,
              color: '#fff',
              text: error.msg
          })
          return false;
      }
    }
})
