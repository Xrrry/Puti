// pages/zen/zen.js
import Notify from '../../vant/notify/notify';
wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()
var util = require('../../utils/util.js')
const ctx = wx.createCanvasContext('canvasProgressbg')
const _ = db.command
Page({
  /**
   * 页面的初始数据
   */
  data: {
    starttimestamp: Date.parse(new Date()) / 1000,
    endtimestamp: Date.parse(new Date()) / 1000,
    timestamp: Date.parse(new Date()) / 1000,
    starttime: util.formatTime(new Date()),
    endtime: util.formatTime(new Date()),
    week: new Date().getDay().toString(),
    wholetime: 0,
    time: 0,
    ishide: false,
    d_value: 0,
    intervalnum: 1,
    animation: '',
    animation1: '',
    animation2: '',
    animation3: '',
    animation4: '',
    animation5: '',
    animation6: '',
    animation7: '',
    animation8: '',
    animation9: '',
    animation10: '',
    animation11: '',
    animation12: '',
    animation13: '',
    sectime: 0,
    mintime: 0,
    intervalnum1: 1,
    settimeoutid1: 1,
    settimeoutid2: 1,
    settimeoutid3: 1,
    settimeoutid4: 1,
    settimeoutid6: 1,
    settimeoutid7: 1,
    isstart: false,
    growthvalue: 0,
    treefilepath: '',
    timingimagesrc: '/images/text/timingtext1.png',
    toend: false,
    count: 0, // 设置 计数器 初始为0
    countTimer: null,
  },

  drawProgressbg: function(step) {
    ctx.setLineWidth(7); // 设置宽度
    ctx.setStrokeStyle('#000000'); // 设置颜色
    ctx.setLineCap('round') // 设置端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.moveTo(0, 0);
    ctx.lineTo(0 + step, 0);
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  },

  countInterval: function() {
    this.countTimer = setInterval(() => {
      if (this.data.count <= 60) {
        this.drawProgressbg(this.data.count)
        this.data.count++;
      } else {
        clearInterval(this.countTimer);
        this.data.count = 0
      }
    }, 50)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.animation = wx.createAnimation({
      duration: "1500",
      timingFunction: "ease",
      transformOrigin: "50% 49% 0"
    })
    this.animation1 = wx.createAnimation({
      duration: "1500",
      timingFunction: "ease",
    })
    this.animation2 = wx.createAnimation({
      duration: "800",
      timingFunction: "ease",
    })
    this.animation3 = wx.createAnimation({
      duration: "800",
      timingFunction: "ease",
    })
    this.animation4 = wx.createAnimation({
      duration: "800",
      timingFunction: "ease",
    })
    this.animation5 = wx.createAnimation({
      duration: "6000",
      timingFunction: "ease-out",
    })
    this.animation6 = wx.createAnimation({
      duration: "6000",
      timingFunction: "ease-out",
    })
    this.animation7 = wx.createAnimation({
      duration: "6000",
      timingFunction: "ease-out",
    })
    this.animation8 = wx.createAnimation({
      duration: "500",
      timingFunction: "ease",
    })
    this.animation9 = wx.createAnimation({
      duration: "500",
      timingFunction: "ease",
    })
    this.animation10 = wx.createAnimation({
      duration: "500",
      timingFunction: "ease",
    })
    this.animation11 = wx.createAnimation({
      duration: "500",
      timingFunction: "ease",
    })
    this.animation12 = wx.createAnimation({
      duration: "500",
      timingFunction: "ease",
    })
    this.animation13 = wx.createAnimation({
      duration: "300",
      timingFunction: "ease",
    })
    this.animation.rotate(0, 0)
      .scale(0)
      .translate(0, 0)
      .skew(0, 0)
      .step({
        duration: 0
      })
    this.animation1.rotate(0, 0)
      .scale(0)
      .translate(0, 0)
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
      .scale(0)
      .opacity(0)
      .translate(0, 0)
      .skew(0, 0)
      .step({
        duration: 0
      })
    this.animation4.rotate(0, 0)
      .scale(0)
      .opacity(0)
      .translate(0, 0)
      .skew(0, 0)
      .step({
        duration: 0
      })
    this.animation5.rotate(0, 0)
      .scale(2.8)
      .opacity(0)
      .translate(0, 0)
      .step({
        duration: 0
      })
    this.animation6.rotate(0, 0)
      .scale(2.8)
      .opacity(0)
      .translate(0, 0)
      .step({
        duration: 0
      })
    this.animation7.rotate(0, 0)
      .scale(2.8)
      .opacity(0)
      .translate(0, 0)
      .step({
        duration: 0
      })
    this.animation8.rotate(0, 0)
      .scale(2.1)
      .opacity(0)
      .translate(0, 0)
      .step({
        duration: 0
      })
    this.animation9.rotate(0, 0)
      .scale(1)
      .opacity(0)
      .translate(0, 0)
      .step({
        duration: 0
      })
    this.animation10.rotate(0, 0)
      .scale(1.01)
      .opacity(0)
      .translate(0, 0)
      .step({
        duration: 0
      })
    this.animation11.rotate(0, 0)
      .scale(1)
      .opacity(0)
      .translate(0, 0)
      .step({
        duration: 0
      })
    this.animation12.rotate(0, 0)
      .scale(1)
      .opacity(0)
      .translate(0, 0)
      .step({
        duration: 0
      })
    this.animation13.rotate(0, 0)
      .scale(1)
      .opacity(0)
      .translate(0, 0)
      .step({
        duration: 0
      })
    this.setData({
      animation: this.animation.export(),
      animation1: this.animation1.export(),
      animation2: this.animation2.export(),
      animation3: this.animation3.export(),
      animation4: this.animation4.export(),
      animation5: this.animation5.export(),
      animation6: this.animation6.export(),
      animation7: this.animation7.export(),
      animation8: this.animation8.export(),
      animation9: this.animation9.export(),
      animation10: this.animation10.export(),
      animation11: this.animation11.export(),
      animation12: this.animation12.export(),
      animation13: this.animation13.export()
    })
    wx.getSetting({
      success: res => {
        console.log(app.globalData.isnew)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
              load()
            }
          })
        } else {
          app.globalData.isnew = true
          tomy()
        }
      }
    })

    function load() {
      app.globalData.isnew = false
      wx.showLoading({
        title: '登录中',
        mask: true
      })
      console.log(555)
      console.log(app.globalData.userInfo)
      getid()
    }

    function tomy() {
      wx.switchTab({
        url: '../my/my',
      })
      app.globalData.isnew = true
    }

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
                  wx.showToast({
                    title: '加载中',
                    icon: 'loading'
                  })
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
                    app.globalData.fansnum = res.data[0].fansnumber,
                      synchronizegrowth()
                    console.log(app.globalData.growthvalue)
                  }
                  downloadtree(calculate(app.globalData.growthvalue))
                },
              })
            },
          })
        }
      })
    }

    function synchronizegrowth() {
      that.setData({
        growthvalue: app.globalData.growthvalue
      })
    }

    function downloadtree(e) {
      var id = 'cloud://clouddatabase-ad8b55.636c-clouddatabase-ad8b55/treeImage/' + e.toString() + '.jpg'
      console.log(id)
      wx.cloud.downloadFile({
        fileID: id, // 文件 ID
        success: res => {
          // 返回临时文件路径
          var thatt = that
          console.log(res.tempFilePath)
          that.setData({
            treefilepath: res.tempFilePath
          })
          app.globalData.treefilepath = res.tempFilePath
          setTimeout(function() {
            thatt.animation9
              .opacity(1)
              .step()
            thatt.animation2
              .opacity(1)
              .step({
                duration: 500
              })
            thatt.animation11
              .opacity(1)
              .step({
                duration: 500
              })
            thatt.setData({
              animation9: thatt.animation9.export(),
              animation2: thatt.animation2.export(),
              animation11: thatt.animation11.export()
            })
            wx.hideToast()
          }, 300)
        },
        fail: console.error
      })
    }

    function calculate(value) {
      if (value < 2000) return 1;
      else if (value < 4000) return 2;
      else if (value < 6000) return 3;
      else if (value < 8000) return 4;
      else if (value < 10000) return 5;
      else if (value < 12000) return 6;
      else return 7;
    }
  },
  rotateAndScale: function() {
    var thatt = this
    var mytime = util.formatTime(new Date()).substring(11, 16)
    var s = mytime.substring(0, 2)
    var e = mytime.substring(3, 5)
    var add = parseInt(s + e)
    console.log(add)
    db.collection('class').where({
        week: this.data.week,
        classnum: app.globalData.classnumber,
        starttimenum: _.lte(add),
        endtimenum: _.gte(add)
      })
      .get({
        success: res => {
          console.log(res.data)
          if (res.data.length) {
            thatt.data.wholetime = res.data[0].wholetime
            var that = thatt
            if (!this.data.isstart) {
              var ran = parseInt(Math.random() * 3) + 1
              this.setData({
                timingimagesrc: '/images/text/timingtext' + ran.toString() + '.png'
              })
              var starttimestamp = Date.parse(new Date());
              var timestamp = Date.parse(new Date());
              var starttime = util.formatTime(new Date());
              starttimestamp = starttimestamp / 1000;
              timestamp = timestamp / 1000;
              this.setData({
                starttimestamp: starttimestamp,
                timestamp: timestamp,
                starttime: starttime,
                isstart: true
              })
              console.log("开始计时")
              console.log(starttimestamp)
              this.data.intervalnum = setInterval(function() {
                if (that.data.isstart) {
                  var timestamp = Date.parse(new Date());
                  timestamp = timestamp / 1000;
                  var time = timestamp - that.data.starttimestamp;
                  console.log("当前时间戳为：" + timestamp);
                  console.log("已开始时间" + (timestamp - that.data.starttimestamp))
                  if ((that.data.time - (parseInt(that.data.time / 60) * 60)) == 59) {
                    that.setData({
                      timestamp: timestamp,
                      time: time,
                      sectime: 0,
                      mintime: that.data.mintime + 1,
                    })
                  } else {
                    that.setData({
                      timestamp: timestamp,
                      time: time,
                      sectime: that.data.time - (parseInt(that.data.time / 60) * 60) + 1,
                      mintime: parseInt(that.data.time / 60),
                    })
                  }
                }
              }, 1000)
              this.animation.rotate(-720)
                .scale(1.6)
                .step()
              this.animation1.rotate(729)
                .scale(1.55)
                .step()
              this.animation2
                .scale(0)
                .opacity(0)
                .step()
              this.animation3
                .scale(1)
                .opacity(1)
                .translate(0, -25)
                .step()
              this.animation4
                .scale(1)
                .opacity(1)
                .translate(0, -25)
                .step()
              this.animation9
                .opacity(0)
                .step({
                  duration: 1000
                })
              this.animation10
                .opacity(1)
                .step({
                  duration: 1000
                })
              this.animation11
                .opacity(0)
                .step({
                  duration: 500
                })

              this.setData({
                animation: this.animation.export(),
                animation1: this.animation1.export(),
                animation2: this.animation2.export(),
                animation3: this.animation3.export(),
                animation4: this.animation4.export(),
                animation9: this.animation9.export(),
                animation10: this.animation10.export(),
                animation11: this.animation11.export()
              })
              setTimeout(function() {
                that.animation12
                  .opacity(1)
                  .step({
                    duration: 500
                  })
                that.setData({
                  animation12: that.animation12.export()
                })
              }, 1000)
            } else {
              wx.showToast({
                title: '已开始计时',
              })
            }
            setTimeout(function() {
              that.animation1
                .rotate(729 + 36000)
                .step({
                  duration: 6000000,
                  timingFunction: "linear"
                })
              that.setData({
                animation1: that.animation1.export()
              })
            }, 1500)
            this.data.settimeoutid1 = setTimeout(function() {
              that.animation8
                .opacity(1)
                .step({
                  duration: 500,
                  timingFunction: "ease"
                })
              that.setData({
                animation8: that.animation8.export()
              })
              that.animation5
                .scale(1.6)
                .opacity(0)
                .step({
                  duration: 100
                })
                .scale(1.6)
                .opacity(1)
                .step({
                  duration: 100
                })
                .scale(2.8)
                .opacity(0)
                .step({
                  duration: 5500
                })
              that.setData({
                animation5: that.animation5.export()
              })
              that.data.settimeoutid6 = setTimeout(function() {
                that.animation6
                  .scale(1.6)
                  .opacity(0)
                  .step({
                    duration: 100
                  })
                  .scale(1.6)
                  .opacity(1)
                  .step({
                    duration: 100
                  })
                  .scale(2.8)
                  .opacity(0)
                  .step({
                    duration: 5500
                  })
                that.setData({
                  animation6: that.animation6.export()
                })
              }, 2000)
              that.data.settimeoutid7 = setTimeout(function() {
                that.animation7
                  .scale(1.6)
                  .opacity(0)
                  .step({
                    duration: 100
                  })
                  .scale(1.6)
                  .opacity(1)
                  .step({
                    duration: 100
                  })
                  .scale(2.8)
                  .opacity(0)
                  .step({
                    duration: 5500
                  })
                that.setData({
                  animation7: that.animation7.export()
                })
              }, 4000)
              inter()
            }, 1300)
          } else {
            Notify({
              text: '不在课程时间内，无法开始计时',
              duration: 2000,
              selector: '#custom-selector',
              backgroundColor: '#00C777'
            })
          }
        }
      })

    function inter() {
      thatt.data.intervalnum1 = setInterval(function() {
        thatt.animation5
          .scale(1.6)
          .opacity(0)
          .step({
            duration: 100
          })
          .scale(1.6)
          .opacity(1)
          .step({
            duration: 100
          })
          .scale(2.8)
          .opacity(0)
          .step({
            duration: 5500
          })
        thatt.setData({
          animation5: thatt.animation5.export()
        })
        thatt.data.settimeoutid2 = setTimeout(function() {
          thatt.animation6
            .scale(1.6)
            .opacity(0)
            .step({
              duration: 100
            })
            .scale(1.6)
            .opacity(1)
            .step({
              duration: 100
            })
            .scale(2.8)
            .opacity(0)
            .step({
              duration: 5500
            })
          thatt.setData({
            animation6: thatt.animation6.export()
          })
        }, 2000)
        thatt.data.settimeoutid3 = setTimeout(function() {
          thatt.animation7
            .scale(1.6)
            .opacity(0)
            .step({
              duration: 100
            })
            .scale(1.6)
            .opacity(1)
            .step({
              duration: 100
            })
            .scale(2.8)
            .opacity(0)
            .step({
              duration: 5500
            })
          thatt.setData({
            animation7: thatt.animation7.export()
          })
        }, 4000)
      }, 6000)
    }
  },
  reset: function() {
    var that = this
    if (this.data.isstart) {
      clearInterval(this.data.intervalnum)
      clearInterval(this.data.intervalnum1)
      clearTimeout(this.data.settimeoutid1)
      clearTimeout(this.data.settimeoutid2)
      clearTimeout(this.data.settimeoutid3)
      clearTimeout(this.data.settimeoutid6)
      clearTimeout(this.data.settimeoutid7)
      var endtimestamp = Date.parse(new Date());
      var endtime = util.formatTime(new Date());
      endtimestamp = endtimestamp / 1000;
      this.setData({
        endtimestamp: endtimestamp,
        endtime: endtime,
        isstart: false
      })
      console.log("终止计时")
      console.log(endtimestamp)
      console.log(endtimestamp - this.data.starttimestamp)
      var time = this.data.time
      var endd = endtime.toString().substring(11, 19)
      var startt = this.data.starttime.toString().substring(11, 19)
      var day = this.data.starttime.toString().substring(0, 10)
      console.log(day)
      console.log(startt)
      console.log(endd)
      clearInterval(this.countTimer);
      this.data.count = 0
      ctx.clearRect(0, 0, wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight)
      ctx.draw()
      this.animation.rotate(0, 0)
        .scale(0)
        .translate(0, 0)
        .skew(0, 0)
        .step({
          duration: 1500
        })
      this.animation1.rotate(0, 720)
        .scale(0)
        .translate(0, 0)
        .skew(0, 0)
        .step({
          duration: 1500
        })
      this.animation2.rotate(0, 0)
        .scale(1)
        .translate(0, 0)
        .skew(0, 0)
        .opacity(1)
        .step({
          duration: 800
        })
      this.animation3.rotate(0, 0)
        .scale(0)
        .opacity(0)
        .translate(0, 0)
        .skew(0, 0)
        .step({
          duration: 800
        })
      this.animation4.rotate(0, 0)
        .scale(0)
        .opacity(0)
        .translate(0, 0)
        .skew(0, 0)
        .step({
          duration: 800
        })
      this.animation5
        .opacity(0)
        .step({
          duration: 500
        })
      this.animation6
        .opacity(0)
        .step({
          duration: 500
        })
      this.animation7
        .opacity(0)
        .step({
          duration: 500
        })
      this.animation8
        .opacity(0)
        .step({
          duration: 0
        })
      this.animation9
        .opacity(1)
        .step({
          duration: 1000
        })
      this.animation10
        .opacity(0)
        .step({
          duration: 1000
        })
      this.animation11
        .opacity(1)
        .step({
          duration: 500
        })
      this.animation12
        .opacity(0)
        .step({
          duration: 500
        })
      /* this.animation13
        .opacity(0)
        .step({
          duration: 300
        }) */
      this.setData({
        animation: this.animation.export(),
        animation1: this.animation1.export(),
        animation2: this.animation2.export(),
        animation3: this.animation3.export(),
        animation4: this.animation4.export(),
        animation5: this.animation5.export(),
        animation6: this.animation6.export(),
        animation7: this.animation7.export(),
        animation8: this.animation8.export(),
        animation9: this.animation9.export(),
        animation10: this.animation10.export(),
        animation11: this.animation11.export(),
        animation12: this.animation12.export(),
        /* animation13: this.animation13.export() */
      })
      console.log('end')
      db.collection('growthrecord').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          starttime: this.data.starttime,
          endtime: this.data.endtime,
          wholetime: this.data.time,
          min: this.data.mintime,
          sec: this.data.sectime,
          day: day,
          starttimeshort: startt,
          endtimeshort: endd,
          growth: parseInt(this.data.time / 10)
        },
        success(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
          console.log("录入成功")
        }
      })
      /* if(this.data.time >= this.data.wholetime*0.8)
      {
        db.collection('growthrecord').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            starttime: this.data.starttime,
            endtime: this.data.endtime,
            wholetime: this.data.time,
            min: this.data.mintime,
            sec: this.data.sectime,
            day: day,
            starttimeshort: startt,
            endtimeshort: endd,
            growth: parseInt(this.data.time / 10)
          },
          success(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            console.log("录入成功")
          }
        })
      }
      else
      {
        Notify({
          text: '总时间小于课程时间的80%，计时无效',
          duration: 3000,
          selector: '#custom-selector',
          backgroundColor: '#1989fa'
        })
      } */
      db.collection('userInfo').where({
          _openid: app.globalData.openid
        })
        .get({
          success: res => {
            console.log(app.globalData.growthvalue + parseInt(that.data.time / 10))
            db.collection('userInfo').doc(res.data[0]._id).update({
              // data 传入需要局部更新的数据
              data: {
                // 表示将 done 字段置为 true
                growthvalue: app.globalData.growthvalue + parseInt(that.data.time / 10)
              },
              success: res => {
                console.log("更新成功")
                app.globalData.growthvalue = app.globalData.growthvalue + parseInt(that.data.time / 10)
                synchronizegrowth()
              }
            })
          }
        })
      setTimeout(function() {
        that.setData({
          sectime: 0,
          mintime: 0,
          time: 0,
          isstart: false
        })
        that.animation5
          .opacity(0)
          .step({
            duration: 100
          })
        that.animation6
          .opacity(0)
          .step({
            duration: 100
          })
        that.animation7
          .opacity(0)
          .step({
            duration: 100
          })
        that.setData({
          animation5: that.animation5.export(),
          animation6: that.animation6.export(),
          animation7: that.animation7.export()
        })
      }, 1500)
    } else {
      wx.showToast({
        title: '未开始计时',
      })
    }

    function synchronizegrowth() {
      that.setData({
        growthvalue: app.globalData.growthvalue
      })
    }
  },
  onstart: function() {
    console.log('start')
    this.animation13
      .opacity(1)
      .step({
        duration: 300
      })
    this.setData({
      animation13: this.animation13.export()
    })
    this.countInterval()
    var that = this
    this.data.settimeoutid4 = setTimeout(function() {
      that.reset()
    }, 3000)
  },
  onend: function() {
    console.log('end')
    clearTimeout(this.data.settimeoutid4)
    clearInterval(this.countTimer)
    this.data.count = 0
    /* this.animation13
      .opacity(0)
      .step({
        duration: 300
      })
    this.setData({
      animation13: this.animation13.export()
    }) */
    ctx.clearRect(0, 0, wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight)
    ctx.draw();
    /* setTimeout(function() {
      ctx.clearRect(0, 0, wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight)
      ctx.draw();
    }, 300) */
  },
  oncancel: function() {
    console.log('cancel')
    clearTimeout(this.data.settimeoutid4)
    clearInterval(this.countTimer)
    this.data.count = 0
    /* this.animation13
      .opacity(0)
      .step({
        duration: 300
      })
    this.setData({
      animation13: this.animation13.export()
    }) */
    ctx.clearRect(0, 0, wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight)
    ctx.draw();
    /* setTimeout(function() {
      ctx.clearRect(0, 0, wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight)
      ctx.draw();
    }, 300) */
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    console.log('test')
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.isnew) {
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
    console.log(app.globalData.showtimestamp)
    console.log(app.globalData.hidetimestamp)
    var isout = app.globalData.isout
    if (this.data.isstart) {
      console.log(getApp().globalData.hassubtract)
      if (isout && !getApp().globalData.hassubtract) {
        getApp().globalData.hassubtract = true
        Notify({
          text: '退出了程序，扣除罚时',
          duration: 2000,
          selector: '#custom-selector',
          backgroundColor: '#1989fa'
        })
        this.setData({
          time: this.data.time - (app.globalData.showtimestamp - app.globalData.hidetimestamp),
          starttimestamp: this.data.starttimestamp + (app.globalData.showtimestamp - app.globalData.hidetimestamp)
        })
        if ((this.data.time - (parseInt(this.data.time / 60) * 60)) == 59) {
          this.setData({
            sectime: 0,
            mintime: this.data.mintime + 1,
          })
        } else {
          this.setData({
            sectime: this.data.time - (parseInt(this.data.time / 60) * 60) + 1,
            mintime: parseInt(this.data.time / 60),
          })
        }
        this.animation1
          .rotate(720 + (this.data.time + 1) * 6)
          .step({
            duration: 1000,
            timingFunction: "ease"
          })
          .rotate(720 + (this.data.time + 1) * 6 + 36000)
          .step({
            duration: 6000000,
            timingFunction: "linear"
          })
        this.setData({
          animation1: this.animation1.export()
        })
        setTimeout(function() {
          getApp().globalData.hassubtract = true
        }, 1000)
      }
    }
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