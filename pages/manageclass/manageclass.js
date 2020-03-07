// pages/manageclass/manageclass.js
wx.cloud.init()
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classs: {},
    identity: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      identity: app.globalData.identity
    })
    console.log(app.globalData.classnumber)
    console.log(app.globalData.school)
    console.log(app.globalData.major)
    db.collection('class').where({
      classnum: app.globalData.classnumber,
      location: app.globalData.school + app.globalData.major
    })
    .orderBy('week','asc')
    .orderBy('starttime','asc')
    .get({
      success: res => {
        console.log(res.data)
        this.setData({
          classs: res.data
        })
      }
    })
  },
  bindadd() {
    wx.navigateTo({
      url: '../addclass/addclass',
    })
  },
  todelete(e) {
    if(app.globalData.identity=='教师')
    {
      wx.showModal({
        title: '确认',
        content: '确认是否删除该课程？',
        success: res => {
          if (res.confirm) {
            db.collection('class').doc(e.currentTarget.dataset.gid._id).remove({
              success() {
                wx.showToast({
                  title: '删除成功',
                  duration: 2000
                })
                getCurrentPages()[getCurrentPages().length - 1].onLoad()
              }
            })
          }
        }
      }) 
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.stopPullDownRefresh;
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
    getCurrentPages()[getCurrentPages().length - 1].onLoad()
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