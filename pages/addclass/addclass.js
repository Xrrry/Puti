// pages/addclass/addclass.js
wx.cloud.init()
const db = wx.cloud.database()
const app = getApp()
var util = require('../../utils/util.js')
import Notify from '../../vant/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    starttime: '',
    endtime: '',
    name: '',
    currentname: '',
    classnumber: 0,
    weeknumber: 0,
    openid: '',
    clArray: ['一班', '二班', '三班', '四班', '五班', '六班', '七班', '八班'],
    weArray: ['周日','周一', '周二', '周三', '周四', '周五', '周六'],
    clObjectArray: [{
        id: 0,
        name: '一班'
      },
      {
        id: 1,
        name: '二班'
      },
      {
        id: 2,
        name: '三班'
      },
      {
        id: 3,
        name: '四班'
      },
      {
        id: 4,
        name: '五班'
      },
      {
        id: 5,
        name: '六班'
      },
      {
        id: 6,
        name: '七班'
      },
      {
        id: 7,
        name: '八班'
      }
    ],
    clIndex: 0,
    weObjectArray: [{
        id: 0,
        name: '周日'
      },
      {
        id: 1,
        name: '周一'
      },
      {
        id: 2,
        name: '周二'
      },
      {
        id: 3,
        name: '周三'
      },
      {
        id: 4,
        name: '周四'
      },
      {
        id: 5,
        name: '周五'
      },
      {
        id: 6,
        name: '周六'
      },
    ],
    weIndex: 0,
  },
  backto() {
    wx.navigateBack({
      delta: 1
    })
  },
  clicksave() {
    var that = this
    console.log(ischecked())
    var stimenum1 = this.data.starttime.substring(0, 2)
    var etimenum1 = this.data.endtime.substring(0, 2)
    var stimenum2 = this.data.starttime.substring(3, 5)
    var etimenum2 = this.data.endtime.substring(3, 5)
    var wholetime = (parseInt(etimenum1) - parseInt(stimenum1)) * 60 + (parseInt(etimenum2) - parseInt(stimenum2))
    var stimenum = stimenum1 + stimenum2
    var etimenum = etimenum1 + etimenum2
    var snum = parseInt(stimenum)
    var endnum = parseInt(etimenum)
    console.log(snum)
    console.log(endnum)
    if(ischecked()==0)
    {
      db.collection('class').add({
        data: {
          classname: this.data.name,
          classnum: this.data.clIndex,
          week: this.data.weIndex,
          starttime: this.data.starttime,
          endtime: this.data.endtime,
          location: app.globalData.school + app.globalData.major,
          teachername: app.globalData.name,
          teacherurl: app.globalData.userInfo.avatarUrl,
          weektext: this.data.weObjectArray[this.data.weeknumber].name,
          starttimenum: snum,
          endtimenum: endnum,
          wholetime: wholetime
        },
        success: res => {
          wx.showModal({
            title: '添加成功',
            content: ' ',
            cancelText: '返回',
            confirmText: '继续添加',
            success(res) {
              if (res.confirm) {
                that.setData({
                  name: '',
                  currentname: '',
                  classnumber: 0,
                  weeknumber: 0,
                  starttime: '',
                  endtime: '',
                  clIndex: 0,
                  weIndex: 0
                })
              } else if (res.cancel) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      })
    }
    else
    {
      var i = ischecked()
      var missing = ''
      if(i==1) missing = '课程名称'
      else if(i==2) missing = '班级'
      else if(i==3) missing = '星期'
      else if(i==4) missing = '上课时间'
      else if(i==5) missing = '下课时间'
      Notify({
        text: '添加失败，请填写完成' + missing,
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#1989FA'
      })
    }
    function ischecked(){
      if(!that.data.name) return 1;
      else if(!that.data.classnumber) return 2;
      else if(!that.data.weeknumber) return 3;
      else if(!that.data.starttime) return 4;
      else if(!that.data.endtime) return 5;
      else return 0;
    }
  },
  bindStartTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      starttime: e.detail.value
    })
  },
  bindEndTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endtime: e.detail.value
    })
  },
  onnamebindblur(e) {
    this.setData({
      name: e.detail.value,
      currentname: e.detail.value
    })
  },
  onclear() {
    this.setData({
      name: '',
      currentname: ''
    })
  },
  clBindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      clIndex: e.detail.value,
      classnumber: e.detail.value
    })
  },
  weBindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      weIndex: e.detail.value,
      weeknumber: e.detail.value
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
  onReady: function() {
  },

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