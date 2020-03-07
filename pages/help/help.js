// pages/help/help.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileID: [
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/help/bar.png',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/help/addclass.png',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/help/classlist.png',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/help/nointime.png',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/help/out.png',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/help/teacherin.png',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/help/afterin.png',
      'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/help/rank.png'
    ],
    headFilePath1: '',
    headFilePath2: '',
    headFilePath3: '',
    headFilePath4: '',
    headFilePath5: '',
    headFilePath6: '',
    headFilePath7: '',
    headFilePath8: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.cloud.downloadFile({
      fileID: this.data.fileID[6], // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        this.setData({
          headFilePath7: res.tempFilePath
        })
      },
      fail: console.error
    })
    wx.cloud.downloadFile({
      fileID: this.data.fileID[7], // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        this.setData({
          headFilePath8: res.tempFilePath
        })
      },
      fail: console.error
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})