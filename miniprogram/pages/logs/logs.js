// pages/logs/logs.js
// pages/login/login.js
const app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.globalData.imgUrl,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    if (app.globalData.isAuthLogin == false) {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            app.globalData.isAuthLogin = true;
            if (app.globalData.isAuthLogin == true) {
              wx.navigateBack({})
            }
          }
        }
      })
    }
    if (options.phone == undefined) {
      wx.setStorageSync('tgm', '');
    } else {
      wx.setStorageSync('tgm', options.phone);
    }
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      var that = this;
      app.userLogin();
      wx.showToast({
        title: '登录中...',
        icon: 'loading',
        duration: 2000
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
            var that = this;
            wx.switchTab({
              url: '../index/index'
            })
          }
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
    var that = this;
    // 查看是否授权
    if (app.globalData.isAuthLogin == false) {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            app.globalData.isAuthLogin = true;
            if (app.globalData.isAuthLogin == true) {
              wx.navigateBack({})
            }
          }
        }
      })
    }
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
 
  }
})