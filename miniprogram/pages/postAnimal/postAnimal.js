// pages/postAnimal/postAnimal.js
wx.cloud.init()
const db = wx.cloud.database();
const app = getApp();
Page({
  data: {
    images:[],//选择图片
    images_success: [],//上传云存储后的云存储地址数组
    images_success_size:0,//图片上传成功的数量
    fileList:[],
    animal: "",
    sterilization:"",
    age:"",
    picAddress:[],
    fileID:[],
    name:"",
    sex:"",
    region:[]
  },
  chooseImg() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.images.length != 0) {
          this.setData({
            images: this.data.images.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            images: res.tempFilePaths
          })
        }
      }
    });
  },
  viewImg(e) {
    wx.previewImage({
      urls: this.data.images,
      current: e.currentTarget.dataset.url
    });
  },
  delImg(e) {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            images: this.data.images
          })
        }
      }
    })
  },
  
  postSubmit(e){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  
  uploadImage(index){
    let that=this
    let add = 'myImage/' + new Date().getTime() + "_" +  Math.floor(Math.random()*1000) + ".jpg"//使用时间戳加随机数给图片
    // that.setData({
    //   picAddress : add
    // })
    // console.log(that.data.picAddress)
      wx.cloud.uploadFile({//上传至微信云存储
        cloudPath:add,
        filePath:that.data.images[index],// 本地文件路径
        success: res => {
          // 返回文件 ID
          console.log("上传成功",res.fileID)
          that.data.images_success[index] = res.fileID;
          that.data.images_success_size = that.data.images_success_size+1;

          
          console.log("lizhenguo",that.data.fileID)
          db.collection('test').add({
            data:{
              age:that.data.age,
              isSterilization:that.data.sterilization,
              species:that.data.animal,
              fileID:that.data.images_success,
              region:that.data.region,
              age:that.data.age,
              sex:that.data.sex,
              name:that.data.name,
              isApproval:false, //true表示公开，false表示未公开
              state:0  //0表示状态待定，1表示审核通过，2表示审核未通过
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
          if(that.data.images_success_size == that.data.images.length){
            console.log("上传成功：", that.data.images_success)
            
          } else {
            that.uploadImage(index+1)
          }
        },
        fail: err =>{
          that.setData({
            images_success:[],
            images_success_size:0
          })
          wx.showToast({
            icon:'none',
            title: '上传失败，请重新上传',
          })
        }
      })
 
  },
 
//  //提交表单添加到数据库
//  addBtn: function(e){
//   let that=this;
//   if(that.data.images.length > 0){//1、判断是否有图片
//     that.setData({
//       //3、给上传图片初始化一个长度，上传成功的数组和已有的数组一致
//       images_success:that.data.images
//     })
//     that.uploadImage(0)//2、有图片时先上传第一张
//     }
   
//  },

  bthsub(res){
    let that = this;
    if(that.data.images.length > 0){//1、判断是否有图片

      that.setData({
        //3、给上传图片初始化一个长度，上传成功的数组和已有的数组一致
        images_success:that.data.images
      })
      that.uploadImage(0)//2、有图片时先上传第一张
    }          
  },

  handleChange1:function(e) {
    let animalValue=e.detail.value;
    let that = this;
    console.log(animalValue)
    // 2 把值 赋值给data中的数据
    that.setData({
      animal:animalValue
    })
  },
  handleChange2:function(e) {
    let animalValue=e.detail.value;
    let that = this;
    console.log(animalValue)
    // 2 把值 赋值给data中的数据
    that.setData({
      sterilization:animalValue
    })
  },
  handleChange3:function(e) {
    let animalValue=e.detail.value;
    let that = this;
    console.log(animalValue)
    // 2 把值 赋值给data中的数据
    that.setData({
      sex:animalValue
    })
  },
  handleInput:function(e) {
    let value = this.validateNumber(e.detail.value)
    console.log(value)
    this.setData({
      age:value
    })
  },
  validateNumber(val) {
    return val.replace(/\D/g, '')
  },
  setName:function(e) {
    let animalValue=e.detail.value;
    let that = this;
    console.log(animalValue)
    // 2 把值 赋值给data中的数据
    that.setData({
      name:animalValue
    })
  },
  getUserProvince:function(e)
  {
     this.setData({
         region:e.detail.value     //将用户选择的省市区赋值给region
     })
  },
  set:function(e)
  {
     this.setData({
         region:e.detail.value     //将用户选择的省市区赋值给region
     })
  }
})