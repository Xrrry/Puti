wx.cloud.init()
const db = wx.cloud.database()
const app = getApp()
const appid = 'wx00cc8c942f9a6074'
const secret = 'b0e8309d57b68e2f9aa4fb3ce83632dc'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    name: '',
    friendNum: 0,
    fansNum: 0,
    growthValue: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    test: false
  },
  followonTap: function(event) {
    wx.navigateTo({
      url: "../friends/friends"
    });
  },
  fansonTap: function(event) {
    wx.navigateTo({
      url: "../fans/fans"
    });
  },
  growthonTap: function(event) {
    wx.navigateTo({
      url: "../mytree/mytree"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        console.log(app.globalData.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      name: e.detail.userInfo.nickName
    })
    getid()

    function getid() {
      db.collection('togetopenid').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          key: app.globalData.userInfo.avatarUrl
        },
        success: res => {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log("录入成功")
          db.collection('togetopenid').where({
            key: app.globalData.userInfo.avatarUrl
          }).get({
            success: res => {
              console.log(res.data[0]._openid)
              app.globalData.openid = res.data[0]._openid
              console.log(app.globalData.openid)
              db.collection('userInfo').where({
                _openid: app.globalData.openid
              }).get({
                success: res => {
                  console.log(res)
                  console.log("同步成功")
                  if (res.data.length >= 1) {
                    app.globalData.clIndex = res.data[0].clIndex
                    app.globalData.classnumber = res.data[0].classnumber
                    app.globalData.idIndex = res.data[0].idIndex
                    app.globalData.identity = res.data[0].identity
                    app.globalData.ischooseschool = res.data[0].ischooseschool
                    app.globalData.major = res.data[0].major
                    app.globalData.multiIndex = res.data[0].multiIndex
                    app.globalData.name = res.data[0].name
                    app.globalData.number = res.data[0].number
                    app.globalData.school = res.data[0].school
                    app.globalData.growthvalue = res.data[0].growthvalue
                    app.globalData.follownum = res.data[0].follownumber,
                    app.globalData.fansnum = res.data[0].fansnumber
                  }
                  else{
                    db.collection('userInfo').add({
                      // data 字段表示需新增的 JSON 数据
                      data: {
                        _id: app.globalData.openid,
                        name: app.globalData.userInfo.nickName,
                        identity: '',
                        school: '',
                        major: '',
                        classnumber: '',
                        number: '',
                        ischooseschool: false,
                        clIndex: '',
                        idIndex: '',
                        multiIndex: [0,0,0],
                        headurl: app.globalData.userInfo.avatarUrl,
                        follownumber: 0,
                        fansnumber: 0,
                        growthvalue: 0
                      }
                    })
                  }
                },
              })
            },
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if(app.globalData.userInfo)
    {
      var that = this
      this.setData({
        openid: app.globalData.openid,
        followNum: app.globalData.follownum,
        growthValue: app.globalData.growthvalue
      })
      if (app.globalData.name) {
        this.setData({
          name: app.globalData.name
        })
      } else {
        this.setData({
          name: app.globalData.userInfo.nickName
        })
      }
      db.collection('relationship').where({
        user2: app.globalData.openid
      })
        .orderBy('user1', 'desc')
        .get({
          success: res => {
            that.setData({
              fansNum: res.data.length
            })
            app.globalData.fansnum = res.data.length
            db.collection('userInfo').doc(app.globalData.openid)
              .update({
                data: {
                  fansnumber: app.globalData.fansnum
                },
                success: res => {
                  console.log("粉丝数更新成功")
                }
              })
          }
        })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

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