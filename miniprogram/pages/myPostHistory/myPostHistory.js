// pages/myPostHistory/myPostHistory.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animal: []
  },
  onLoad(options) {
    var that = this
    let info = app.globalData.userInfo
    // console.log("用户信息："+info.openid)
    db.collection('test').where({
      _openid: info.openid
    }).get({
      success: function (res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        // console.log(res)
        that.setData({
          animal: res.data,
        })
        console.log(that.data.animal)
      }
    })
  },
  //路由传参到动物详情页
  toDetail(e) {
    console.log(e)
    wx.reLaunch({
      url: `/pages/detail/detail?id=${e.currentTarget.id}`,
    })
  },
  toPost: function (e) {
    wx.reLaunch({
      url: '../postAnimal/postAnimal',
    })
  }
})