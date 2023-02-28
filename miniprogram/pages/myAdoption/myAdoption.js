// pages/message/message.js
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    animalInfo:[],
  },
  toAdoptionDetail(e){
    console.log(e)
    wx.reLaunch({
      url: `/pages/adoptionDetail/adoptionDetail?id=${e.currentTarget.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    let userInfo = app.globalData.userInfo
    db.collection('adoption').where({
      _openid:userInfo.openid
    }).get({
      success:(res)=>{
        console.log(res)
        for(var i=0;i<res.data.length;i++){
          db.collection('test').doc(res.data[i].animalid).get({
            success:(res)=>{
              that.setData({
                animalInfo:that.data.animalInfo.concat(res.data)
              })
              console.log("finally",that.data.animalInfo)
            }
          })
        }
        
        
      }
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