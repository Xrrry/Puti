// pages/in/in.js
import Notify from '../../vant/notify/notify';
const db = wx.cloud.database()
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    currentpassword: '',
    list: ['1', '2', '3', '4', '5', '6', '7', '8'],
    result: [],
    activeNames: [],
    signid: app.globalData.signid,
    intervalid: 0,
    user: {},
    isstart: false
  },
  //取消按钮  

  onChange1(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  onChange2(event) {
    this.setData({
      result: event.detail
    });
  },
  onpasswordbindblur(e) {
    this.setData({
      password: e.detail.value,
      currentpassword: e.detail.value
    })
    clearInterval(this.data.intervalid)
    this.setData({
      user: {}
    })
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  binduser(e) {
    console.log(e.currentTarget.dataset.gid._openid)
    db.collection('userInfo').where({
      _openid: e.currentTarget.dataset.gid._openid
    })
    .get({
      success: res=> {
        var currentuser = res.data[0]
        app.globalData.currentfriend = currentuser
        wx.navigateTo({
          url: '../friendstree/friendstree',
        })
      }
    })
  },
  onClickRight() {
    var add = gettime()
    if (!this.data.password) {
      Notify({
        text: '请填写签到密码',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#1989fa'
      })
    } 
    else if(this.data.password.length!=6)
    {
      Notify({
        text: '请填写六位签到密码',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#1989fa'
      })
    }
    else if (!this.data.result.length) {
      Notify({
        text: '请选择需要签到的班级',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#1989fa'
      })
    } else {
      var that = this
      var id = app.globalData.openid + util.formatTime(new Date())
      app.globalData.signid = id
      this.setData({
        signid: id
      })
      for (var i = 0; i < this.data.result.length; i++) {
        db.collection('teachersign').add({
          data: {
            password: this.data.password,
            classs: (parseInt(this.data.result[i]) - 1).toString(),
            time: add,
            day: util.formatTime(new Date()).substring(0, 10),
            teachername: app.globalData.name,
            location: app.globalData.school + app.globalData.major,
            actually: adjusttime(gettime),
            signid: id
          },
          success: res => {
            var that = this
            if(!this.data.isstart)
            {
              clearInterval(this.data.intervalid)
              this.data.isstart = true
              this.data.intervalid = setInterval(function () {
                db.collection('studentsign').where({
                  signid: that.data.signid
                })
                  .orderBy('timenumber', 'asc')
                  .get({
                    success: res => {
                      console.log(res.data)
                      that.setData({
                        user: res.data
                      })
                    }
                  })
              }, 5000)
            }
          }
        })
      }
      Notify({
        text: '发起签到成功',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#00C777'
      })
    }
    function gettime() {
      var mytime = util.formatTime(new Date()).substring(11, 19)
      var h = mytime.substring(0, 2)
      var m = mytime.substring(3, 5)
      var s = mytime.substring(6, 8)
      var add = parseInt(h + m + s)
      return add
    }
    function adjusttime() {
      var later = gettime()
      if (parseInt((later / 100) % 100) == 59) {
        var actually = parseInt(later / 10000 + 1) * 10000 + parseInt(later % 100)
      }
      else {
        var actually = later + 100
      }
      return actually
    }
  },
  onclear() {
    this.setData({
      password: '',
      currentpassword: ''
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
    if(app.globalData.signid)
    {
      var that = this
      db.collection('studentsign').where({
        signid: app.globalData.signid
      })
        .orderBy('timenumber', 'asc')
        .get({
          success: res => {
            console.log(res.data)
            that.setData({
              user: res.data
            })
          }
        })
      Notify({
        text: '正在查看上次签到',
        duration: 2000,
        selector: '#custom-selector',
        backgroundColor: '#00C777'
      })
      this.data.intervalid = setInterval(function () {
        db.collection('studentsign').where({
          signid: app.globalData.signid
        })
          .orderBy('timenumber', 'asc')
          .get({
            success: res => {
              console.log(res.data)
              that.setData({
                user: res.data
              })
            }
          })
      }, 5000)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(this.data.intervalid)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.intervalid)
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