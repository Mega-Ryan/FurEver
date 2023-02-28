// pages/cloudAdoption/cloudAdoption.js
const db = wx.cloud.database()
<<<<<<< Updated upstream
=======
const app = getApp()

>>>>>>> Stashed changes
Page({
  /**
   * 页面的初始数据
   */
  data: {
    animal: []
  },
<<<<<<< Updated upstream

=======
  //路由传参到动物详情页
  toDetail(e) {
    console.log(e)
    wx.reLaunch({
      url: `/pages/detail/detail?id=${e.currentTarget.id}`,
    })
  },
>>>>>>> Stashed changes
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    db.collection('test').where({}).get({
<<<<<<< Updated upstream
      success: function(res) {
=======
      success: res => {
>>>>>>> Stashed changes
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res)
        that.setData({
          animal: res.data,
        })
        console.log(that.data.animal)
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
    console.log("onShow")
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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