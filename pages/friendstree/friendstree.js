// pages/friendstree/friendstree.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentuser: [],
    checked: false,
    treefilepath: '',
    animation: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.animation = wx.createAnimation({
      duration: "500",
      timingFunction: "ease"
    })
    this.animation.rotate(0, 0)
      .scale(1)
      .opacity(0)
      .translate(0, 0)
      .skew(0, 0)
      .step({
        duration: 0
      })
    this.setData({
      animation: this.animation.export()
    })
    var title = app.globalData.currentfriend.name + '的主页'
    downloadtree(calculate(app.globalData.currentfriend.growthvalue))
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      currentuser: app.globalData.currentfriend
    })
    var that = this
    db.collection('relationship').where({
        user1: app.globalData.openid,
        user2: that.data.currentuser._openid
      })
      .get({
        success: res => {
          if (res.data.length > 0) {
            console.log('true')
            that.setData({
              checked: true
            })
          } else {
            console.log('false')
            that.setData({
              checked: false
            })
          }
        }
      })

    function downloadtree(e) {
      var id = 'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/treeImage/' + e.toString() + '.jpg'
      console.log(id)
      wx.cloud.downloadFile({
        fileID: id, // 文件 ID
        success: res => {
          // 返回临时文件路径
          console.log(res.tempFilePath)
          that.setData({
            treefilepath: res.tempFilePath
          })
          app.globalData.treefilepath = res.tempFilePath
          wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: '#F4F3A1',
            animation: {
              duration: 800,
              timingFunc: 'easeInOut'
            }
          })
          setTimeout(function () {
            that.animation
              .opacity(1)
              .step()
            that.setData({
              animation: that.animation.export()
            })
          }, 300)
        },
        fail: console.error
      })
    }

    function calculate(value) {
      var r = 2000
      if (value < r) return 1;
      else if (value < r * 2) return 2;
      else if (value < r * 3) return 3;
      else if (value < r * 4) return 4;
      else if (value < r * 5) return 5;
      else if (value < r * 6) return 6;
      else return 7;
    }
  },
  bindtofollow() {
    this.setData({
      checked: true
    })
    var that = this
    var id = app.globalData.openid + this.data.currentuser._openid
    db.collection('relationship').add({
      data: {
        _id: id,
        user1: app.globalData.openid,
        user2: this.data.currentuser._openid,
      },
      success: res => {
        db.collection('userInfo').doc(app.globalData.openid)
          .update({
            data: {
              follownumber: app.globalData.follownum + 1
            },
            success: res=> {
              app.globalData.follownum +=1
              console.log("关注成功")
              wx.showToast({
                title: '关注成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
      }
    })
  },
  bindunfollow() {
    this.setData({
      checked: false
    })
    var id = app.globalData.openid + this.data.currentuser._openid
    db.collection('relationship').doc(id)
      .remove({
        success: res => {
          db.collection('userInfo').doc(app.globalData.openid)
            .update({
              data: {
                follownumber: app.globalData.follownum - 1
              },
              success: res=> {
                app.globalData.follownum -= 1
                console.log("取消关注成功")
                wx.showToast({
                  title: '取消关注成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})