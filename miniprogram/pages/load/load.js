

var app = getApp()
// miniprogram/pages/load/load.js
const db = wx.cloud.database()
const _ = db.command
const user = db.collection('user')
const postList = db.collection('postList')
let result = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    userName: null,
    avatarUrl: null,
    address: null,
    openid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getUserProfile(e) {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log("授权成功",res)
        app.globalData.userInfo = res.userInfo
        console.log(app.globalData.userInfo)
        wx.login({
          //成功放回
          success:(res)=>{
            console.log(res);
            let code=res.code
            //通过code换取openid
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx22b562d719e06d6a&secret=9d28947c2878d786001a824db6de1a06&js_code=${code}&grant_type=authorization_code`,
              success:(res)=>{
                console.log(res);
                app.globalData.userInfo.openid=res.data.openid
                //获取到你的openid
                console.log(app.globalData.userInfo);
                //判断该用户是否存储在数据库中
                user.where({
                  _openid: app.globalData.userInfo.openid
                }).get({
                  success:(res)=>{ 
                    if(res.data.length == 0){
                      console.log(res)
                      console.log(app.globalData.userInfo.nickName)
                      user.add({
                        data:{
                          userName:app.globalData.userInfo.nickName,
                          done:false
                        }
                       
                      })
                    }
                  }
                })
              }
            })
          }
        })
        
        wx.reLaunch({
          url: '/pages/myPage/myPage',
        })
      },
      fail:(res)=>{
        console.log("授权失败",res)
      }
    })
  },
  bindViewTap(e){
    console.log(e)
    wx.reLaunch({
      url: '../myPage/mypage',
    })
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

  }
})