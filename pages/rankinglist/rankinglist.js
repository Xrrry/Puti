// pages/rankinglist/rankinglist.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [],
    usernum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    db.collection('userInfo')
    .orderBy('growthvalue', 'desc')
    .get({
      success: res=> {
        console.log(res)
        this.setData({
          user: res.data,
          usernum: res.data.length
        })
        wx.hideToast()
      }
    })
  },
  binduser: function(e) {
    console.log(e.currentTarget.dataset.gid)
  },
  onClick(event) {
    console.log(event.detail.index+1)
    if(event.detail.index+1==1)
    {
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      })
      db.collection('userInfo')
        .orderBy('growthvalue', 'desc')
        .get({
          success: res => {
            console.log(res)
            this.setData({
              user: res.data,
              usernum: res.data.length
            })
            wx.hideToast()
          }
        })
    }
    else if(event.detail.index+1==2)
    {
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      })
      db.collection('userInfo').where({
        school: app.globalData.school
      })
        .orderBy('growthvalue', 'desc')
        .get({
          success: res => {
            console.log(res)
            this.setData({
              user: res.data,
              usernum: res.data.length
            })
            wx.hideToast()
          }
        })
    }
    else 
    {
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      })
      db.collection('userInfo').where({
        school: app.globalData.school,
        major: app.globalData.major,
        classnumber: app.globalData.classnumber
      })
        .orderBy('growthvalue', 'desc')
        .get({
          success: res => {
            console.log(res)
            this.setData({
              user: res.data,
              usernum: res.data.length
            })
            wx.hideToast()
          }
        })
    }
  },
  /*
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (event.detail.index + 1 == 1) {
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      })
      db.collection('userInfo')
        .orderBy('growthvalue', 'desc')
        .skip(that.data.user.length)
        .get({
          success: res => {
            that.data.user.push(...res.data)
            that.setData({
              user: that.data.user,
              usernum: that.data.user.length
            })
            console.log(that.data.user)
            wx.hideToast()
          }
        })
    }
    else if (event.detail.index + 1 == 2) {
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      })
      db.collection('userInfo').where({
        school: app.globalData.school
      })
        .skip(that.data.user.length)
        .orderBy('growthvalue', 'desc')
        .get({
          success: res => {
            that.data.user.push(...res.data)
            that.setData({
              user: that.data.user,
              usernum: that.data.user.length
            })
            console.log(that.data.user)
            wx.hideToast()
          }
        })
    }
    else {
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      })
      db.collection('userInfo').where({
        school: app.globalData.school,
        major: app.globalData.major,
        classnumber: app.globalData.classnumber
      })
        .skip(that.data.user.length)
        .orderBy('growthvalue', 'desc')
        .get({
          success: res => {
            that.data.user.push(...res.data)
            that.setData({
              user: that.data.user,
              usernum: that.data.user.length
            })
            console.log(that.data.user)
            wx.hideToast()
          }
        })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})