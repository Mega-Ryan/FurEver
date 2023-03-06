// pages/cloudAdoption/cloudAdoption.js
const db = wx.cloud.database()
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    animal:[],
    typeItems:['物种','性别'],
    typeCurrentIndex:0,
    chooseItems:{
      0:[{
        name:'猫',
        value:'cat',
        selected:false
      },{
        name:'狗',
        value:'dog',
        selected:false
      },{
        name:'其他',
        value:'other',
        selected:false
      }
    ],
    1:[{
      name:'雄',
      value:'male',
      selected:false
    },{
      name:'雌',
      value:'female',
      selected:false
    }]
    },
    region:null,
    species:null,
    sex:null
  },
  //路由传参到动物详情页
  toDetail(e){
    console.log(e)
    wx.reLaunch({
      url: `/pages/detail/detail?id=${e.currentTarget.id}`,
    })
  },

  //筛选
  //下拉收回
  sreenShow(){
    this.setData({
      sreenShow:!this.data.sreenShow
    })
  },
  cancel:function(){
    this.setData({
      sreenShow:false
    })
  },
  //清空选择
  clear:function(){
    // console.log("clear已调用")
    for(var i=0,t=1000;i<t;i++){
      if(this.data.chooseItems[i]==null){
        break;
      }
      for(var m=0,n=1000;m<n;m++){
        if(this.data.chooseItems[i][m]==null){
          break;
        }
        this.data.chooseItems[i][m].selected=false
      }
    }
    this.setData({
      chooseItems:this.data.chooseItems,
      region:[]
    })
  },
  //确认筛选
  confirm:function(){
    let that = this
    that.setData({
      species:null,
      sreenShow:false,
      sex:null,
      animal:[]
    })
    for(var i=0,t=1000;i<t;i++){
      if(that.data.chooseItems[i]==null){
        break;
      }
      for(var m=0,n=1000;m<n;m++){
        if(that.data.chooseItems[i][m]==null){
          break;
        }
        if(that.data.chooseItems[i][m].selected==true){
          if(i==0){
            that.setData({
              species:that.data.chooseItems[i][m].value //设置
            })
          }else if(i==1)(
            that.setData({
              sex:that.data.chooseItems[i][m].value
            })
          )
        }
      }
    }
    console.log(that.data.species)
    console.log(that.data.sex)
    console.log(that.data.region)
    //从数据库中筛选
    db.collection('test').where({
      isApproval:true
    }).get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        // console.log("数据库查询结果:")
        // console.log(res)
        that.data.animal = res.data
        if(that.data.species != null){
          that.data.animal = []
          for(var i=0;i<res.data.length;i++){
            if(res.data[i].species == that.data.species){
              that.setData({
                animal:that.data.animal.concat(res.data[i])
              })
        
            }
          }
        }
        var animal1 = that.data.animal
        if(that.data.sex != null){
          that.data.animal = []
          for(var i=0;i<animal1.length;i++){
            if(animal1[i].sex == that.data.sex){
              that.setData({
                animal:that.data.animal.concat(animal1[i])
              })
            }
          }
        }
        var animal2 = that.data.animal
        if(that.data.region != null){
          that.data.animal = []
          for(var i=0;i<animal2.length;i++){
            if(animal2[i].region == that.data.region){
              that.setData({
                animal:that.data.animal.concat(animal2[i])
              })
            }
          }
        }
        
        // console.log(that.data.animal)
        // console.log("找到的结果")
        // console.log(that.data.animal)
      }
    })
    if(that.data.species==null&&that.data.sex==null){//清除选择 重定向
      wx.reLaunch({
        url: '../cloudAdoption/cloudAdoption',
      })
    }
  },
  sortShow:function(){
    this.setData({
      sortShow:!this.data.sortShow
    })
  },
  //点击遮罩层
  mask:function(){
    this.setData({
      sreenShow:false,
      sortShow:false
    })
  },
  //选择类型
  chooseType:function(e){
    const{index}=e.currentTarget.dataset;
    console.log(index);
    this.setData({
      typeCurrentIndex:index,
    })
  },
  //选择具体内容
  chooseItem:function(e){
    console.log("输出的"+e.target.dataset.index)
    for(var i=0;i<100;i++){
      if(this.data.chooseItems[this.data.typeCurrentIndex][i]==null){
        break;
      }
      if(i!=e.target.dataset.index){
        this.data.chooseItems[this.data.typeCurrentIndex][i].selected=false
        // console.log(this.data.chooseItems[this.data.typeCurrentIndex][i])
      }
    }
    this.data.chooseItems[this.data.typeCurrentIndex][e.target.dataset.index].selected=!this.data.chooseItems[this.data.typeCurrentIndex][e.target.dataset.index].selected
    this.setData({
      chooseItems:this.data.chooseItems
    })
  },
  getUserProvince:function(e)
  {
     this.setData({
         region:e.detail.value     //将用户选择的省市区赋值给region
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
    var that = this
    db.collection('test').where({
      isApproval:true
    }).get({
      success: res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res)
        that.setData({
          animal:res.data,
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