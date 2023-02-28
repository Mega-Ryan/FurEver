// pages/message/message.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animalInfo:null
  },
  adoption(e){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定云养？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          db.collection('test').doc(that.data.animalInfo._id).get({
            success:(res)=>{
                console.log(res)
                db.collection('adoption').add({
                  data:{
                    animalid:res.data._id,
                    hostid:res.data._openid
                  }
                })
                wx.reLaunch({
                  url: '../myAdoption/myAdoption',
                })
            }
          })
        } else {//这里是点击了取消以后
          
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    //console.log("动物唯一标识符",options.id)
    db.collection('test').doc(options.id).get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res)
        that.setData({
          animalInfo:res.data
        })
        console.log("animalInfo",that.data.animalInfo)
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

  },
  donation:function(e){
    // console.log(e)
    wx.reLaunch({
      url: `../donation/donation?id=${e.currentTarget.id}`,
    })
  }
})