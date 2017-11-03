var appInstance = getApp();
import {getYdCaptcha,sendYdSearchMsg,toYdSearch} from '../../../../service/getData'
import {$wuxToast} from '../../../../components/wux'
Page({
  data: {
      userInfo : {
          servpwd : '',
          captcha: '',
          sms : ""
      },
      sendBtnText : '发送验证码',
      sendBtnIsAbleClick : true,
      timer : null,
      timer1 : null,
      reqId : '',//用户随机窜
      phone : '',//用户电话号码
      count : 60,
      captchaUrl : '',//图形验证码
      currentTimeStamp : new Date().getTime(),//当前时间戳
      //验证规则
      verifyRule : {
          servpwd: {
              required: true
          },
          captcha : {
              required: true
          },
          sms : {
              required: true
          }
      },
      //验证规则对应的提示信息
      verifyMsg : {
          servpwd: {
              required: '请填写服务密码'
          },
          captcha : {
              required: '请填写图形验证码'
          },
          sms : {
              required: '请填写短信验证码'
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
    onLoad(option){
        debugger;
        //参数中获取登录成功的reqId与phone
        // let _reqId = option.reqId,_phone = option.phone;
        let _phone = '15982819091',_reqId = 'mobile_18d8eba6c07d11e7ab3000163e08e75e';//这里测试数据
        if(!_reqId || !_phone){
            $wuxToast.show({
                type : 'cancel',
                timer: 1500,
                color: '#fff',
                text: '缺少必要参数...'
            });
            return;
        }
        this.setData({
            reqId : _reqId,
            phone : _phone
        })
        //初始化表单验证
        this.wxValidate = appInstance.wxValidate(this.data.verifyRule,this.data.verifyMsg);
        // wx.setStorage({
        //   key:"loginMsgTimeStamp",
        //   data:'1509702341253'
        // });
        //判断当前时间距离上次发送的短信的时间差是否大于60s
        wx.getStorage({
          key: 'loginMsgTimeStamp',
          success: res => {
            if(res.data){//本地存储存在
                var oldTimeStamp = parseInt(res.data);
                if((this.data.currentTimeStamp - oldTimeStamp) < 60 * 1000){//两次时间差不超过60s
                    //开启时间戳
                    this.data.timer1 = setInterval(() => {
                        this.setData({
                            currentTimeStamp : this.data.currentTimeStamp + 1000
                        })
                        let tempTime = parseInt((this.data.currentTimeStamp - oldTimeStamp) / 1000);
                        if(tempTime > 59){//能够发送了
                            clearInterval(this.data.timer1);
                            this.setData({
                                sendBtnIsAbleClick : true,
                                sendBtnText : '发送验证码'
                            })
                            this.sendMsg();
                        }else{
                            this.setData({
                                sendBtnIsAbleClick : false,
                                sendBtnText : '发送验证码(' + (60 - tempTime) + ')s'
                            })
                        }
                    },1000)
                }else{//能够发送
                    this.sendMsg();
                }
            }else{
                this.sendMsg();
            }
          } 
        });


        //初始化图形验证码
        this.initCaptcha();
    },
    //发送验证码(这里无法获取整个表单字段对象,自己手动验证)
    sendMsg(){
        const  that = this;
        if(!that.data.sendBtnIsAbleClick){return}
            //验证手机号是否符合
            if(that.data.phone){
                //这里去发送验证码
                sendYdSearchMsg({
                    loadingText : '短信发送中...',
                    data : {
                        phone : that.data.phone,
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
    /*
     * @name  getCaptcha
     * @param
     * @description 获取图形验证码
     */
    initCaptcha(){
        const that = this;
        getYdCaptcha({
            data : {
                reqId : that.data.reqId
            },
            isLoading : false
        },getSuc);
        function getSuc(res){//设置图形验证码
            res.data.captcha && that.setData({
                captchaUrl : res.data.captcha
            })
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
      let reqParam = Object.assign(e.detail.value,{reqId : that.data.reqId,username : that.data.phone});
        //移动登录
        toYdSearch({
            type : 'POST',
            loadingText : '查询中...',
            data : reqParam
        },searchSuc);
        //登录成功
        function searchSuc(res) {
            //调用自定义loading组件
           console.log('查询成功')
        }
    }
})
