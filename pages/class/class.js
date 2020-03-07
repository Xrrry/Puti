// pages/class/class.js
import Notify from '../../vant/notify/notify'
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    inputData: {
      input_value: "", //输入框的初始内容
      value_length: 0, //输入框密码位数
      isNext: false, //是否有下一步的按钮
      get_focus: true, //输入框的聚焦状态
      focus_class: true, //输入框聚焦样式
      value_num: [1, 2, 3, 4, 5, 6], //输入框格子数
      height: "98rpx", //输入框高度
      width: "604rpx", //输入框宽度
      see: false, //是否明文展示
      interval: true, //是否显示间隔格子
    }
  },
  // 当组件输入数字6位数时的自定义函数
  valueSix(e) {
    console.log(e.detail)
    // 模态交互效果
    this.setData({
      hiddenmodalput: true
    })
    var add = gettime()
    const _ = db.command
    db.collection('teachersign').where({
        location: app.globalData.school + app.globalData.major,
        day: util.formatTime(new Date()).substring(0, 10),
        classs: app.globalData.classnumber,
        actually: _.gte(gettime()),
        password: e.detail
      })
      .orderBy('time','desc')
      .get({
        success: res => {
          if (res.data.length) {
            var name = res.data[0].teachername
            db.collection('studentsign').add({
              data: {
                time: util.formatTime(new Date()),
                timenumber: gettime(),
                signid: res.data[0].signid,
                name: app.globalData.name,
                headurl: app.globalData.userInfo.avatarUrl
              },
              success: res => {
                Notify({
                  text: '您已签到成功'+name+'老师的课程',
                  duration: 3000,
                  selector: '#custom-selector',
                  backgroundColor: '#00C777'
                })
              }
            })
          } else {
            Notify({
              text: '签到失败：教师未发起签到、密码错误或超时',
              duration: 5000,
              selector: '#custom-selector',
              backgroundColor: '#1989fa'
            })
          }
        }
      })

    function gettime() {
      var mytime = util.formatTime(new Date()).substring(11, 19)
      var h = mytime.substring(0, 2)
      var m = mytime.substring(3, 5)
      var s = mytime.substring(6, 8)
      var add = parseInt(h + m + s)
      return add
    }
  },
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    })
  },
  //确认  
  confirm: function() {
    Notify({
      text: '签到失败：请输入六位签到密码',
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#1989fa'
    })
  },
  oninbind() {
    if (app.globalData.identity == '教师') {
      wx.navigateTo({
        url: '../in/in',
      })
    } else {
      this.setData({
        hiddenmodalput: false
      })
    }
  },
  onpptbind() {
    wx.navigateTo({
      url: '../ppt/ppt'
    })
  },
  onclassbind() {
    wx.navigateTo({
      url: '../manageclass/manageclass'
    })
  },
  onrankbind() {
    wx.navigateTo({
      url: '../rankinglist/rankinglist'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})