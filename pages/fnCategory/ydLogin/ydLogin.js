var appInstance = getApp();
import {getYdReqId,sendYdMsg} from '../../service/getData'
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
        e.detail.value && (this.data[e.target.dataset.type] = e.detail.value);//不用setData
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
        debugger;
        this.wxValidate = appInstance.wxValidate(this.data.verifyRule,this.data.verifyMsg);
    },
    //发送验证码
    sendMsg(){
        if(!this.data.sendBtnIsAbleClick){return}
        // if(this.wxValidate.checkParam('username',{
        //         required: true,
        //         tel: true,
        //     })){
        //
        // }
        //这里去发送验证码
        let reqParams = Object.assign(this.data.userInfo,{reqId : this.data.reqId});//初始化请求参数
        sendYdMsg({
            type : 'POST',
            data : {
                reqParams
            }
        },sendSuc);
        function sendSuc(res){
            this.data.timer = setInterval(() => {
                this.data.count--;
                if(this.data.count <= 0){
                    this.setData({
                        sendBtnIsAbleClick : true,
                        sendBtnText : '重新发送',
                        count : 59
                    })
                    clearInterval(this.data.timer);
                }else{
                    this.setData({
                        sendBtnText : '(' + this.data.count + ')后秒后重新发送',
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
