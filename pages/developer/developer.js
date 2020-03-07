// pages/developer/developer.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileID: [
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/developerHead/xry.jpg',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/developerHead/yhf.png',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/developerHead/fcr.jpg',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/developerHead/yjq.jpg',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/developerHead/gza.jpg',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/developerHead/qbz.jpg'
    ],
    headFilePath1: '',
    headFilePath2: '',
    headFilePath3: '',
    headFilePath4: '',
    headFilePath5: '',
    headFilePath6: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.downloadFile({
      fileID: this.data.fileID[0], // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        this.setData({
          headFilePath1: res.tempFilePath
        })
      },
      fail: console.error
    })
    wx.cloud.downloadFile({
      fileID: this.data.fileID[1], // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        this.setData({
          headFilePath2: res.tempFilePath
        })
      },
      fail: console.error
    })
    wx.cloud.downloadFile({
      fileID: this.data.fileID[2], // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        this.setData({
          headFilePath3: res.tempFilePath
        })
      },
      fail: console.error
    })
    wx.cloud.downloadFile({
      fileID: this.data.fileID[3], // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        this.setData({
          headFilePath4: res.tempFilePath
        })
      },
      fail: console.error
    })
    wx.cloud.downloadFile({
      fileID: this.data.fileID[4], // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        this.setData({
          headFilePath5: res.tempFilePath
        })
      },
      fail: console.error
    })
    wx.cloud.downloadFile({
      fileID: this.data.fileID[5], // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        this.setData({
          headFilePath6: res.tempFilePath
        })
      },
      fail: console.error
    })
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