// pages/message/message.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    donationInfo:[]
  },
  myReicive(e){
    this.Query()
  },
  myPost(e){
    this.post()
  },
  toQuery(e){
    console.log(e)
    let index = e.target.id
    console.log(index)
    wx.reLaunch({
      url: `../findExpress/findExpress?express=${this.data.donationInfo[0].express}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  Query(){
    let that = this
    console.log(app.globalData.userInfo.openid)
    db.collection('donation').where({
      receiverID:app.globalData.userInfo.openid,
    }).get({
      success:(res)=>{
        that.setData({
          donationInfo:res.data
        })
        console.log(res)
      }
    })
  },
  post(){
    let that = this
    console.log(app.globalData.userInfo.openid)
    db.collection('donation').where({
      _openid:app.globalData.userInfo.openid,
    }).get({
      success:(res)=>{
        that.setData({
          donationInfo:res.data
        })
      }
    })
  },
  onLoad(options) {
    this.Query()
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