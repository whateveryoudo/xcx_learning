//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : {

    },
      itemList : [
          '从相册中选取',
          '优雅自拍'
      ],
      headUrl : ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户信息
      if (app.globalData.userInfo) {
          this.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
          })
      } else if (this.data.canIUse){
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          app.userInfoReadyCallback = res => {
              this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
              })
          }
      } else {
          // 在没有 open-type=getUserInfo 版本的兼容处理
          wx.getUserInfo({
              success: res => {
                  app.globalData.userInfo = res.userInfo
                  this.setData({
                      userInfo: res.userInfo,
                      hasUserInfo: true
                  })
              }
          })
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
    changeHead : function(){
        const that = this;
        wx.showActionSheet({
            itemList: this.data.itemList,
            success: function(res) {
                if(res.cancel){return};
                wx.chooseImage({
                    count: 1, // 默认9(只能选一张)
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'][res.tapIndex], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                        var tempFilePaths = res.tempFilePaths;
                        wx.showLoading({
                          title : '头像上传中...',
                            success(){
                                //模拟上传
                                setTimeout(() => {
                                    wx.hideLoading();
                                    that.data.userInfo.avatarUrl = tempFilePaths[0];
                                    that.setData({
                                        userInfo : that.data.userInfo
                                    })
                                },2000)
                            }
                        })
                    }
                })
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        })
    }
})