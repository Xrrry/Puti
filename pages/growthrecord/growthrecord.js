// pages/growthrecord/growthrecord.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: [],
    lastnum: 0,
    lastlastnum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('growthrecord').where({
      _openid: app.globalData.openid
    }).orderBy('starttime','desc')
      .get({
        success(res) {
          that.setData({
            record: res.data,
            lastnum: res.data.length
          })
          console.log(that.data.record)
        }
      })
  },

  /**
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
    if(this.data.lastnum!=this.data.lastlastnum)
    {
      wx.showToast({
        title: '加载更多',
        icon: 'loading'
      })
      db.collection('growthrecord').where({
        _openid: app.globalData.openid
      }).orderBy('starttime', 'desc')
        .skip(this.data.record.length)
        .get({
          success: res => {
            this.data.record.push(...res.data)
            this.setData({
              record: this.data.record,
              lastlastnum: this.data.lastnum,
              lastnum: this.data.record.length
            })
            wx.hideToast()
            console.log(this.data.record)
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