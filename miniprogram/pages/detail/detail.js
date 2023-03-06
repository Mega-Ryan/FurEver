// pages/message/message.js
const db = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
  */
  data: {
    animalInfo:null,
    cardCur: 0
  },
  adoption(e){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定云养？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          // 先查询有没有同样的领养记录
          db.collection('test').doc(that.data.animalInfo._id).get({//先查询当前领养动物的id
            success:(res)=>{
                console.log("查询到的记录：")
                console.log(res)
                console.log("查询到的记录")
                let _idTEMP = res.data._id
                let _openidTEMP = res.data._openid
                db.collection('adoption').where({
                  animalid:res.data._id,
                  hostid:res.data._openid,
                  _openid:app.globalData.userInfo.openid
                }).get().then(res=>{
                  // console.log(res)
                  // console.log(app.globalData.userInfo)
                  if (res.data.length==0){
                    console.log("why")
                    db.collection('adoption').add({//然后再加一条记录（动物id+领养人id）有重复记录风险
                      data:{
                        animalid:_idTEMP,
                        hostid:_openidTEMP
                      }
                    })
                    wx.reLaunch({
                      url: '../myAdoption/myAdoption',
                    })
                  }else{
                    wx.showModal({
                      title: '认养失败',
                      content: '您已认养该流浪动物',
                      complete: (res) => {

                      }
                    })
                  }
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