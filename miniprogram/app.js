// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init({
      env:"cloud1-6gt7m3fn0b4fb5ce",
      traceUser:true
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  userLogin: function () {
    // 登录
    var that = this;
    wx.login({
      success: res => {
        console.log(res)
        if (res.code) {
          wx.request({
            url: '接口名称',
            data: {
              code: res.code,
              time: that.globalData.time,
              rand: that.globalData.pwd,
              sign: that.globalData.jiamiStr
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (data) {
              console.log(data)
              if (data.data.status == 200 && data.data.session_key != null) {
                wx.setStorageSync('session_key', data.data.session_key);
                that.userInfo();
              }
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  userInfo: function () {
    //获取用户信息
    var that = this;
    var session_key = wx.getStorageSync('session_key');
    //获取授权信息
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) { //授权成功 获取信息
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          that.globalData.isAuthLogin = true;
          wx.getUserInfo({
            success: function (res) {
              wx.setStorageSync('encryptedData', res.encryptedData);
              wx.setStorageSync('iv', res.iv);
              wx.request({
                url:  '接口名称',
                data: {
                  time: that.globalData.time,
                  rand: that.globalData.pwd,
                  sign: that.globalData.jiamiStr,
                  encryptedData: res.encryptedData,
                  session_key: session_key,
                  iv: res.iv,
                  user_id: wx.getStorageSync('user_id')
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (user_info) {
                  if (user_info.data.status == 200) {
                    wx.setStorageSync('user_id', user_info.data.data.user_id);
                    wx.setStorageSync('token', user_info.data.data.token);
                    if (wx.getStorageSync('is_ziliao') == 0) {
                      wx.navigateTo({
                        url: '../user/gerenziliao',
                      })
                    } else {
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }
                    wx.setStorageSync('is_authorization', '1');
                    that.jiami()
                  } else {
                    wx.setStorageSync('is_authorization', '0');
                  }
                },
              });
            }
          })
        } else //授权失败, 重新授权
        {
          console.log(' //授权失败, 重新授权');
          that.globalData.isAuthLogin = false;
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
})
