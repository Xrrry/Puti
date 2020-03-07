// pages/filesearch/filesearch.js
const db = wx.cloud.database()
const app = getApp()
wx.cloud.init()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    file: [],
    filenum: 0,
    lastnum: 0,
    lastlastnum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    db.collection('togetpptid').where({
        filename: db.RegExp({
          regexp: that.data.value,
          options: 'i',
        }),
        location: app.globalData.school + app.globalData.major + app.globalData.classnumber
      })
      .orderBy('filenumber', 'desc')
      .get({
        success: res => {
          console.log(res)
          that.setData({
            file: res.data,
            filenum: res.data.length,
            lastnum: res.data.length
          })
          wx.hideToast()
        },
      })
  },
  bindfile: function(e) {
    console.log("打开文档")
    wx.showToast({
      title: '下载文件中',
      icon: 'loading',
      mask: true
    })
    console.log(e)
    wx.cloud.downloadFile({
      fileID: e.currentTarget.dataset.gid.fileid,
      success: res => {
        // get temp file path
        console.log(res.tempFilePath)
        console.log(res)
        this.setData({
          tempFilePath: res.tempFilePath
        })
        var ress = res
        db.collection('togetpptid').where({
            fileid: e.currentTarget.dataset.gid.fileid
          })
          .get({
            success: res => {
              console.log(res.data[0].filetype)
              wx.openDocument({
                filePath: ress.tempFilePath,
                fileType: res.data[0].filetype,
                success(res) {
                  console.log('打开文档成功')
                  wx.hideToast()
                },
                fail(error) {
                  console.log(error)
                }
              })
            }
          })
      },
      fail: err => {
        // handle error
      }
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
    if (this.data.lastnum != this.data.lastlastnum) {
      wx.showToast({
        title: '加载更多',
        icon: 'loading'
      })
      db.collection('togetpptid').where({
          filename: db.RegExp({
            regexp: this.data.value,
            options: 'i',
          }),
          location: app.globalData.school + app.globalData.major + app.globalData.classnumber
        })
        .orderBy('filenumber', 'desc')
        .skip(this.data.file.length)
        .get({
          success: res => {
            this.data.file.push(...res.data)
            this.setData({
              file: this.data.file,
              filenum: this.data.file.length,
              lastlastnum: this.data.lastnum,
              lastnum: this.data.file.length
            })
            console.log(this.data.file)
            wx.hideToast()
          },
        })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})