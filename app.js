//app.js
/* 等级百分比
注释
*/
wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()
App({
  data: {},
  onLaunch: function() {
    wx.onAppShow(function(res) {
      console.log("apponshow")
      console.log(res)
      getApp().globalData.showtimestamp = Date.parse(new Date()) / 1000
      wx.getScreenBrightness({
        success: res => {
          console.log('获取屏幕亮度成功')
          console.log(res.value)
          getApp().globalData.showscreenbright = res.value
          getApp().globalData.hassubtract = false
        }
      })
    })
    wx.onAppHide(function(res) {
      console.log("apponhide")
      console.log(res)
      getApp().globalData.hidetimestamp = Date.parse(new Date()) / 1000
      wx.getScreenBrightness({
        success: res => {
          console.log('获取屏幕亮度成功')
          console.log(res.value)
          getApp().globalData.hidescreenbright = res.value
        }
      })
      setTimeout(function() {
        if (getApp().globalData.hidescreenbright == getApp().globalData.showscreenbright) {
          getApp().globalData.isout = true
          getApp().globalData.hassubtract = false
          console.log("isout")
          console.log(getApp().globalData.hidescreenbright)
          console.log(getApp().globalData.showscreenbright)
        } else {
          getApp().globalData.isout = false
          console.log("justoff")
          console.log(getApp().globalData.hidescreenbright)
          console.log(getApp().globalData.showscreenbright)
        }
      }, 1000)
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    //console.log('123:'+logs)
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    /* wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        else
        {
          this.globalData.isnew = true
        }
      }
    }) */
  },
  globalData: {
    userInfo: null,
    name: '',
    isnamechange: false,
    ischooseschool: false,
    identity: '学生',
    idIndex: '0',
    classnumber: '0',
    clIndex: '0',
    major: '',
    school: '',
    multiIndex: [0, 0, 0],
    number: '',
    openid: '',
    follownum: 0,
    fansnum: 0,
    growthvalue: 0,
    showscreenbright: 0,
    hidescreenbright: 0,
    isout: false,
    showtimestamp: Date.parse(new Date()) / 1000,
    hidetimestamp: Date.parse(new Date()) / 1000,
    hassubtract: true,
    filenumber: 0,
    currentfriend: null,
    treefilepath: '',
    signid: '',
    wtime: 0,
    isnew: false
  }
})