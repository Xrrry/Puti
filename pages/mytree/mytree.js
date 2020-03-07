// pages/mytree/mytree.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [],
    treefilepath: '',
    animation: '',
    animation1: '',
    animation2: '',
    animation3: '',
    stage: 1,
    stageimagesrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    calculatetime()
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var rate = 2.2384
    var height = wx.getSystemInfoSync().windowHeight
    console.log(height)
    var gap = height / rate
    console.log(gap)
    var pergap = gap / 7
    console.log(pergap)
    this.animation = wx.createAnimation({
      duration: "1500",
      timingFunction: "ease"
    })
    this.animation1 = wx.createAnimation({
      duration: "1500",
      timingFunction: "ease"
    })
    this.animation2 = wx.createAnimation({
      duration: "1500",
      timingFunction: "ease"
    })
    this.animation3 = wx.createAnimation({
      duration: "500",
      timingFunction: "ease"
    })
    this.animation.rotate(0, 0)
      .scale(1)
      .opacity(0)
      .translate(0, gap)
      .skew(0, 0)
      .step({
        duration: 0
      })
    this.animation1.rotate(0, 0)
      .scale(1)
      .opacity(0)
      .translate(-50, 0)
      .skew(0, 0)
      .step({
        duration: 0
      })
    this.animation2.rotate(0, 0)
      .scale(1)
      .opacity(0)
      .translate(0, 0)
      .skew(0, 0)
      .step({
        duration: 0
      })
    this.animation3.rotate(0, 0)
      .scale(1)
      .opacity(0)
      .translate(0, 0)
      .skew(0, 0)
      .step({
        duration: 0
      })
    this.setData({
      animation: this.animation.export(),
      animation1: this.animation1.export(),
      animation2: this.animation2.export(),
      animation3: this.animation3.export()
    })
    var stage = calculate(app.globalData.growthvalue)
    this.setData({
      stageimagesrc: '/images/number/' + stage.toString() + '.png'
    })
    downloadtree(calculate(app.globalData.growthvalue))
    var that = this
    db.collection('userInfo').where({
        _openid: app.globalData.openid
      })
      .get({
        success: res => {
          this.setData({
            user: res.data[0]
          })
        }
      })

    function downloadtree(e) {
      console.log(666)
      var id = 'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/treeImage/' + e.toString() + '.png'
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
          wx.hideLoading()
          wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: '#F4F3A1',
            animation: {
              duration: 800,
              timingFunc: 'easeInOut'
            }
          })
          setTimeout(function() {
            that.animation
              .opacity(1)
              .translate(0, calculatey(app.globalData.growthvalue))
              .step()
            that.animation1
              .opacity(1)
              .translate(0, 0)
              .step()
            that.animation2
              .opacity(1)
              .translate(0, 0)
              .step()
            that.animation3
              .opacity(1)
              .step()
            that.setData({
              animation: that.animation.export(),
              animation1: that.animation1.export(),
              animation2: that.animation2.export(),
              animation3: that.animation3.export()
            })
          }, 300)
        },
        fail: console.error
      })
    }
    function calculatetime() {
      var that = this
      db.collection('class').where({
        location: app.globalData.school + app.globalData.major,
        classnum: app.globalData.clIndex
      })
      .get({
        success: res=> {
          console.log(res.data)
          var time = 0
          for(var i=0;i<res.data.length;i++)
          {
            time = time + res.data[i].wholetime
          }
          app.globalData.wtime = time
          console.log(123)
          console.log(time)
          console.log(app.globalData.wtime)
        }
      })
    }
    function calculate(value) {
      var r = 2000
      if (value < r) return 1;
      else if (value < r*2) return 2;
      else if (value < r*3) return 3;
      else if (value < r*4) return 4;
      else if (value < r*5) return 5;
      else if (value < r*6) return 6;
      else return 7;
    }

    function calculatey(value) {
      if (gap - (((value / 2000) + 1) * pergap) <= 0) return 0;
      return gap - (((value / 2000) + 1) * pergap)
    }
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