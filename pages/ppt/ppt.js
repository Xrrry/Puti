// pages/ppt/ppt.js
const db = wx.cloud.database()
const app = getApp()
wx.cloud.init()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePath: '',
    ppt: {},
    pptnum: 0,
    filenumber: 0,
    lastnum: 0,
    lastlastnum: 0
  },
  bindupload: function() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        console.log(res.tempFiles[0])
        var type = res.tempFiles[0].name.split(".")[res.tempFiles[0].name.split(".").length - 1]
        if (type == 'ppt' || type == 'pptx' || type == 'doc' || type == 'docx' || type == 'xls' || type == 'xlsx' || type == 'pdf' || type == 'PPT' || type == 'PPTX' || type == 'DOC' || type == 'DOCX' || type == 'XLS' || type == 'XLSX' || type == 'PDF') {
          var that = res
          wx.cloud.uploadFile({
            cloudPath: 'ppt/' + res.tempFiles[0].name,
            filePath: res.tempFiles[0].path, // 文件路径
            success: res => {
              db.collection('togetpptid').add({
                data: {
                  fileid: res.fileID,
                  filename: that.tempFiles[0].name,
                  location: app.globalData.school + app.globalData.major + app.globalData.classnumber,
                  filenumber: app.globalData.filenumber + 1,
                  filetype: that.tempFiles[0].name.split(".")[that.tempFiles[0].name.split(".").length - 1]
                },
                success: res => {
                  console.log("上传成功")
                  app.globalData.filenumber = app.globalData.filenumber + 1
                }
              })
            },
            fail: err => {
              // handle error
              console.log(err)
            }
          })
        } else {
          wx.showToast({
            title: '暂不支持上传此类型文件',
            icon: 'none',
            duration: 2000
          })
        }
      }

    })
  },
  bindsearch: function() {
    console.log("点击搜索")
    wx.navigateTo({
      url: '../filesearch/filesearch',
    })
  },
  bindppt: function(e) {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    db.collection('togetpptid').where({
        location: app.globalData.school + app.globalData.major + app.globalData.classnumber
      })
      .orderBy('filenumber', 'desc')
      .get({
        success: res => {
          console.log(res)
          app.globalData.filenumber = res.data[0].filenumber
          this.setData({
            ppt: res.data,
            pptnum: res.data.length,
            lastnum: res.data.length
          })
          wx.hideToast()
        },
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.stopPullDownRefresh
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
    if (this.data.lastnum != this.data.lastlastnum) {
      wx.showToast({
        title: '加载更多',
        icon: 'loading'
      })
      db.collection('togetpptid').where({
          location: app.globalData.school + app.globalData.major + app.globalData.classnumber
        })
        .orderBy('filenumber', 'desc')
        .skip(this.data.ppt.length)
        .get({
          success: res => {
            this.data.ppt.push(...res.data)
            this.setData({
              ppt: this.data.ppt,
              lastlastnum: this.data.lastnum,
              lastnum: this.data.ppt.length
            })
            console.log(this.data.ppt)
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