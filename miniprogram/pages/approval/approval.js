const db = wx.cloud.database()
// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animal:[]
  },
  confirm(e){
    let that = this
    var index = e.currentTarget.id
    console.log(index)
    console.log(that.data.animal[index])
    db.collection('test').doc(that.data.animal[index]._id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 state 字段置为 1，审核通过
        isApproval: true,
        state:1
      },
      success: function(res) {
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: '审核完成',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              wx.reLaunch({
                url: '../approval/approval',
              })
            } else {//这里是点击了取消以后
              wx.reLaunch({
                url: '../approval/approval',
              })
            }
          }
        })
        
      }
    })
    
  },
  refuse(e){
    let that = this
    var index = e.currentTarget.id
    console.log(index)
    console.log(that.data.animal[index])
    db.collection('test').doc(that.data.animal[index]._id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 状态 字段置为 2 审核没通过
        state:2
      },
      success: function(res) {
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: '审核完成',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              wx.reLaunch({
                url: '../approval/approval',
              })
            } else {//这里是点击了取消以后
              wx.reLaunch({
                url: '../approval/approval',
              })
            }
          }
        })
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    db.collection('test').where({
      isApproval:false
    }).get({
      success:function(res){
        that.setData({
          animal:res.data,
        })
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