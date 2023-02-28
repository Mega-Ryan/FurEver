// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //
    wx.cloud.init({
      env: 'cloud1-6gt7m3fn0b4fb5ce',
      traceUser: true,
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  getExpressInfo: function(nu, cb) {
    wx.request({
      url: 'https://ali-deliver.showapi.com/showapi_expInfo?com=auto&nu='+nu,
      data: {
        
      },
      header: {
        'Authorization': 'APPCODE 59336dcd6be14b508774f233c7d436b7'
      },
      success: function(res) {
        console.log(res.data)
        cb(res.data)
      }
    })
  },
  globalData: {
    userInfo: null
  },
  
})
