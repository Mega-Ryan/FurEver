// pages/donation/donation.js
wx.cloud.init()
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    express:"",
    type:"",
    weight:"",
    information:"",
    lastArea:"",
    receiverID:"",
    animalID:""
  },
  onLoad(options){
    console.log("接收：")
    console.log(options)
    db.collection('test').where({
      //where其实是向集合里查询是否有里面这对数据，如果有就返回这条数据记录
      //一般是使用openid（一个用户只有一个openid，具有唯一性，方便查询操作）
      //但目前获取openid需要使用云函数，所以这里就不细讲了，我这里使用每条记录都带有的_id来进行查询
      _id: options.id
    }).get().then(res => {
      console.log('数据查询成功',res)//将返回值存到res里
      this.setData({
        //将查询到的数据记录里的number的值存放到data.number
        receiverID: res.data[0]._openid,
        animalID:res.data[0]._id
      })
    }).catch(err => {
      console.log('查询失败',err)//失败提示错误信息
    })
    console.log(this.data.receiverID)
  },
  handleChange1:function(e) {
    let animalValue=e.detail.value;
    let that = this;
    console.log(animalValue)
    // 2 把值 赋值给data中的数据
    that.setData({
      type:animalValue
    })
  },
  handleInput:function(e) {
    let value = this.validateNumber(e.detail.value)
    console.log(value)
    this.setData({
      express:value
    })
  },
  handleInput2:function(e) {
    let value = this.validateNumber(e.detail.value)
    console.log(value)
    this.setData({
      weight:value
    })
  },
  validateNumber(val) {
    return val.replace(/\D/g, '')
  },
  // 获取输入框的值
  getDataBindTap: function(e) {
    var information = e.detail.value;//输入的内容
    var value = e.detail.value.length;//输入内容的长度
    var lastArea = 150 - value;//剩余字数
    var that = this;
    that.setData({
      information: information,
      lastArea: lastArea
    })
  },
  bthsub(res){
    let that = this;
    db.collection('donation').add({
      data:{
        express:that.data.express,
        type:that.data.type,
        weight:that.data.weight,
        information:that.data.information,
        lastArea:that.data.lastArea,
        receiverID:that.data.receiverID,
        animalID:that.data.animalID
      },
      success:function(res){
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '添加成功',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              wx.reLaunch({
                url: '../index/index',
              })
            } else {//这里是点击了取消以后
             
            }
          }
        })
      },
      fail:err=>{
        wx.showModal({
          title: '提示',
          content: '添加失败',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              wx.reLaunch({
                url: '../postAnimal/postAnimal',
              })
            } else {//这里是点击了取消以后
              
            }
          }
        })
      }

    })
  },
})