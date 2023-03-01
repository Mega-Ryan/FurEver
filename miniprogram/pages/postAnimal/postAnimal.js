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
    animal: "cat",
    sterilization:'yes',
    age:"",
    picAddress:[],
    fileID:[],
    name:"",

    sex:"male",
    region:["北京市", "北京市", "东城区"],
    description:"",
    index:null,
    ageRange: ['未知', '1岁以下', '2岁', '3岁', '4岁', '5岁', '6岁', '7岁', '8岁', '9岁', '10岁及以上'],
    wh:0,
    position:'back',
    src:'',
    plain:true,
    token:'',
    faceInfo:{},
    animalInfo:'',
    images:'',
    access_token:'',
    isDetect:false,
    outInfo:'',
  },

  descripInput(e) {
    let descrip=e.detail.value;
    let that = this;
    // 2 把值 赋值给data中的数据
    that.setData({
      description:descrip
    })
  },

  agePick(e) {
    let idx = e.detail.value;
    let that = this
    console.log(that.data.ageRange[idx]);
    that.setData({
      index: idx,
      age: that.data.ageRange[idx]
    })
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

        this.setData({
          src:res.tempFilePaths[0],
         });

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

          this.data.images.splice(e.currentTarget.dataset.index, 1);

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
              state:0,  //0表示状态待定，1表示审核通过，2表示审核未通过
              description:that.data.description
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
    console.log("性别",animalValue)
    // 2 把值 赋值给data中的数据
    that.setData({
      sex:(animalValue ? "male" : "female")
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
  },
    getFaceInfo(){
    // 1token
    // 2参数
    // 3发请求 获取数据
    wx.request({
      method:'POST',
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=yN9rawMZgUPrBPuUsKn3mSOa&client_secret=5eq8dytkq5NNloUDRND0AUy60eIcYMct',
      //之前自己api接口的那串字符
      //成果回调函数
      
      success:(res)=>{
        // console.log('token',res)
        this.setData({
        //Access Token我们就获取了。
          token:res.data.access_token
        }, 
        ()=>{
        //马上执行参数函数
          this.processParams()
                })
      }
    })

  },
  //参数处理过程
  processParams(){
  //  创立对象：params
  console.log('调用processParams')
      const params={
        image:''//我们需要携带的参数，把本地图片的格式转换为64编码，才能识别
      }
      //文件管理器：处理文件
      const fileManager = wx.getFileSystemManager()
      fileManager.readFile({
      //图片路径
        filePath	:this.data.src,
        // 以什么格式读取文件
        encoding:'base64',
      //  成果回调函数
        success:(res)=>{
          // console.log("11",res)
          params.image=res.data
          //讲转换好的base64图片给 params.image
          // console.log("21", params)
        //  执行：百度智能接口的调用。
          this.testFace(params)
        }
        })
    },
      // 发送给、请求获取数据
      testFace(params){
        let that = this
      // 加载提示
      console.log('调用testFace')
        wx.showLoading({
          title: '正在测试...',
        })
        //request请求
      wx.request({
        method:'POST', //post请求
        url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/animal?access_token='+this.data.token,
        //字符串拼接 this.data.token 获取的token
        //  请求头
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 请求体
        data:params,//上面获取的参数
        //成果回调函数
        success:(res)=>{
          // console.log(22,res)
          //判断一下下呢：如果 request:ok 获取的结果 不为空就执行
    if(res.errMsg === 'request:ok' && res.data.result !== null){
      // console.log(22,res.data.result)
      //看看百度接口给我们返会的
      this.setData({
      //数组赋值
        animalInfo:[res.data.result[0]],
        isDetect:true,
        outInfo:"是"+res.data.result[0].name+"的可能性为"+res.data.result[0].score
      })
      console.log(res.data.result)
    }
    },complete: () => {
        wx.hideLoading()
      }
    }) 
    },
    baidu:function(e){
      let that = this
      console.log("why?")
      that.getFaceInfo()
    }
})