// pages/postAnimal/postAnimal.js
wx.cloud.init()
const db = wx.cloud.database();
Page({
  data: {
    animal: "",
    sterilization:"",
    age:""
  },
  bthsub(res){
    db.collection('test').add({
      data:{
        age:this.data.age,
        is:this.data.sterilization,
        species:this.data.animal
      },
      success:function(res){
        console.log(res)
      }
    })
  },

  handleChange1:function(e) {
    let animalValue=e.detail.value;
    console.log(animalValue)
    // 2 把值 赋值给data中的数据
    this.setData({
      animal:animalValue
    })
  },
  handleChange2:function(e) {
    let animalValue=e.detail.value;
    console.log(animalValue)
    // 2 把值 赋值给data中的数据
    this.setData({
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