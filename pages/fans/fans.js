// pages/fans/fans.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [],
    userdetail: [],
    usernum: 0,
    lastnum: 0,
    lastlastnum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    var that = this
    db.collection('relationship').where({
      user2: app.globalData.openid
    })
      .orderBy('user1', 'desc')
      .get({
        success: res => {
          that.setData({
            user: res.data
          })
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            console.log(i)
            console.log(that.data.user[i].user1)
            db.collection('userInfo').where({
              _openid: that.data.user[i].user1
            })
              .get({
                success: res => {
                  that.data.userdetail.push(res.data[0])
                  that.setData({
                    userdetail: that.data.userdetail,
                    usernum: that.data.userdetail.length,
                    lastnum: that.data.userdetail.length
                  })
                  wx.hideToast()
                }
              })
          }
        }
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
  bindadd() {
    wx.navigateTo({
      url: '../friendssearch/friendssearch',
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
        title: '加载中',
        icon: 'loading'
      })
      var that = this
      db.collection('relationship').where({
        user2: app.globalData.openid
      })
        .orderBy('user1', 'desc')
        .skip(that.data.user.length)
        .get({
          success: res => {
            that.data.user.push(...res.data)
            that.setData({
              user: that.data.user,
              usernum: that.data.user.length,
              lastlastnum: that.data.lastnum,
              lastnum: that.data.user.length
            })
            console.log(that.data.user)
            for (var i = 0; i < res.data.length; i++) {
              console.log(that.data.user[i].user1)
              db.collection('userInfo').where({
                _openid: res.data[i].user1
              })
                .limit(1)
                .get({
                  success: res => {
                    console.log(res.data)
                    that.data.userdetail.push(...res.data)
                    that.setData({
                      userdetail: that.data.userdetail,
                      usernum: that.data.userdetail.length,
                      lastnum: that.data.userdetail.length
                    })
                    wx.hideToast()
                  }
                })
            }
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