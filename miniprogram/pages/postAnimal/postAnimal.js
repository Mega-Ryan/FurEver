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
    fileID:[]

    
  },
  upload(){
    let that=this;
    wx.chooseImage({//异步方法
      count: 3,//最多选择图片数量
      sizeType:['original', 'compressed'],//选择的图片尺寸 原图，压缩图
      sourceType:['album','camera'],//相册选图，相机拍照
      success(res){
        //const tempFilePaths = res.tempFilePaths
        that.setData({

          images: res.tempFilePaths,

         });
         console.log("选择成功",res)
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
              is:that.data.sterilization,
              species:that.data.animal,
              fileID:that.data.images_success
            },
            success:function(res){
              console.log(res)
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
  handleInput:function(e) {
    let value = this.validateNumber(e.detail.value)
    console.log(value)
    this.setData({
      age:value
    })
  },
  validateNumber(val) {
    return val.replace(/\D/g, '')
  }
})