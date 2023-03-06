// pages/myPage/myPage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo:[],
    iconList: [{
      icon: 'attentionfavor',
      color: 'red',
      badge: 120,
      name: '我的云养',
      url: 'toAdoption'
    }, {
      icon: 'community',
      color: 'orange',
      badge: 1,
      name: '我的发布',
      url: 'toAdd'
    }, {
      icon: 'record',
      color: 'yellow',
      badge: 0,
      name: '我的直播',
      url: 'toLive'
    }, {
      icon: 'deliver',
      color: 'olive',
      badge: 22,
      name: '物资信息',
      url: 'toFindExpress'
    }],
    gridCol:4,
    skin: false
  },
  toAdoption(e){
    wx.reLaunch({
      url: '../myAdoption/myAdoption',
    })
  },
  toFindExpress(e){
    wx.reLaunch({
      url: '../findExpress/findExpress',
    })
  },
  toApproval(e){
    wx.reLaunch({
      url: '../approval/approval'
    })
  },
  toAdd(e){
    wx.reLaunch({
      url: '../myPostHistory/myPostHistory'
    })
  },
  myAddress(e){
    wx.reLaunch({
      url: '../addressList/addressList',
    })
  },
  toLive(e){
    wx.reLaunch({
      url: '../live/live',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(!app.globalData.hasUserInfo){
      wx.reLaunch({
        url: '../load/load',
      })
    }
    this.setData({
      userInfo : app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})