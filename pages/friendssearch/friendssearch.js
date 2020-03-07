// pages/friendssearch/friendssearch.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    searchresult: [],
    resultnum: 0,
    lastnum: 0,
    lastlastnum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onchange(e) {
    this.setData({
      value: e.detail
    })
  },
  onSearch() {
    console.log(this.data.value)
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    var that = this
    const _ = db.command
    db.collection('userInfo').where({
      number: db.RegExp({
        regexp: that.data.value,
        options: 'i'
      }),
      _openid: _.neq(app.globalData.openid)
    })
      .orderBy('name', 'asc')
      .get({
        success: res => {
          console.log(res)
          that.setData({
            searchresult: res.data,
            resultnum: res.data.length,
            lastnum: res.data.length
          })
          wx.hideToast()
        },
      })
  },
  binduser(e) {
    console.log(e.currentTarget.dataset.gid)
    var currentuser = e.currentTarget.dataset.gid
    app.globalData.currentfriend = currentuser
    wx.navigateTo({
      url: '../friendstree/friendstree',
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
    if (this.data.lastnum != this.data.lastlastnum) {
      wx.showToast({
        title: '加载更多',
        icon: 'loading'
      })
      db.collection('userInfo').where({
        number: db.RegExp({
          regexp: this.data.value,
          options: 'i',
        }),
      })
        .orderBy('name', 'asc')
        .skip(this.data.searchresult.length)
        .get({
          success: res => {
            this.data.searchresult.push(...res.data)
            this.setData({
              searchresult: this.data.searchresult,
              resultnum: this.data.searchresult.length,
              lastlastnum: this.data.lastnum,
              lastnum: this.data.searchresult.length
            })
            console.log(this.data.searchresult)
            wx.hideToast()
          },
        })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})