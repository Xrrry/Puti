// pages/editinfo/editinfo.js
wx.cloud.init()
const db = wx.cloud.database()
const app = getApp()
import Toast from '../../vant/toast/toast';
import Notify from '../../vant/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isexist: false,
    id: '',
    focus: false,
    userInfo: {},
    name: '',
    currentname: '',
    currentmajor: '',
    currentnumber: '',
    identity: '',
    school: '',
    major: '',
    classnumber: 0,
    number: '',
    ischangename: false,
    ischangenamecurrent: false,
    ischooseschool: false,
    idArray: ['学生', '教师'],
    isidchange: false,
    isclasschange: false,
    isschoolchange: false,
    idObjectArray: [{
        id: 0,
        name: '学生'
      },
      {
        id: 1,
        name: '教师'
      }
    ],
    idIndex: 0,
    clArray: ['一班', '二班', '三班', '四班', '五班', '六班', '七班', '八班'],
    clObjectArray: [{
        id: 0,
        name: '一班'
      },
      {
        id: 1,
        name: '二班'
      },
      {
        id: 2,
        name: '三班'
      },
      {
        id: 3,
        name: '四班'
      },
      {
        id: 4,
        name: '五班'
      },
      {
        id: 5,
        name: '六班'
      },
      {
        id: 6,
        name: '七班'
      },
      {
        id: 7,
        name: '八班'
      }
    ],
    clIndex: 0,
    multiArray: [
      ['北京市', '河南省', '河北省', '福建省', '上海市', '四川省', '辽宁省', '湖北省'],
      ['北京市'],
      ['北京大学', '清华大学', '中国人民大学', '北京航空航天大学', '北京师范大学', '北京理工大学', '北京交通大学', '中央财经大学', '北京外国语大学']
    ],
    objectMultiArray: [
      [{
          id: 0,
          name: '北京市'
        },
        {
          id: 1,
          name: '河南省'
        },
        {
          id: 2,
          name: '河北省'
        },
        {
          id: 3,
          name: '福建省'
        },
        {
          id: 4,
          name: '上海市'
        },
        {
          id: 5,
          name: '四川省'
        },
        {
          id: 6,
          name: '辽宁省'
        },
        {
          id: 7,
          name: '湖北省'
        }
      ],
      [{
        id: 0,
        name: '北京市'
      }],
      [{
          id: 0,
          name: '北京大学'
        },
        {
          id: 1,
          name: '清华大学'
        },
        {
          id: 2,
          name: '中国人民大学'
        },
        {
          id: 3,
          name: '北京航空航天大学'
        },
        {
          id: 4,
          name: '北京师范大学'
        },
        {
          id: 5,
          name: '北京理工大学'
        },
        {
          id: 6,
          name: '北京交通大学'
        },
        {
          id: 7,
          name: '中央财经大学'
        },
        {
          id: 8,
          name: '北京外国语大学'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    customItem: '全部'
  },
  backto() {
    wx.navigateBack({
      delta: 1
    })
  },
  clicksave() {
    Notify({
      text: '保存成功',
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#1989fa'
    })
    if (this.data.isexist) {
      console.log("有该用户信息")
      db.collection('userInfo').doc(app.globalData.openid).update({
        data: {
          clIndex: this.data.clIndex,
          classnumber: this.data.classnumber,
          idIndex: this.data.idIndex,
          ischooseschool: this.data.ischooseschool,
          major: this.data.major,
          multiIndex: this.data.multiIndex,
          name: this.data.name,
          number: this.data.number,
          school: this.data.school,
          identity: this.data.identity,
          headurl: app.globalData.userInfo.avatarUrl
        },
        success: res => {
          app.globalData.clIndex = this.data.clIndex
          app.globalData.classnumber = this.data.classnumber
          app.globalData.idIndex = this.data.idIndex
          app.globalData.ischooseschool = this.data.ischooseschool
          app.globalData.major = this.data.major
          app.globalData.multiIndex = this.data.multiIndex
          app.globalData.name = this.data.name
          app.globalData.number = this.data.number
          app.globalData.school = this.data.school
          app.globalData.identity = this.data.identity
          console.log("更改数据成功")
        }
      })
    } else {
      console.log("无该用户信息")
      if(this.data.name)
      {
        db.collection('userInfo').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            _id: app.globalData.openid,
            name: this.data.name,
            identity: this.data.identity,
            school: this.data.school,
            major: this.data.major,
            classnumber: this.data.classnumber,
            number: this.data.number,
            ischooseschool: this.data.ischooseschool,
            clIndex: this.data.clIndex,
            idIndex: this.data.idIndex,
            multiIndex: this.data.multiIndex,
            headurl: app.globalData.userInfo.avatarUrl,
            follownumber: 0,
            fansnumber: 0,
            growthvalue: 0
          },
          success: res => {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            app.globalData.clIndex = this.data.clIndex
            app.globalData.classnumber = this.data.classnumber
            app.globalData.idIndex = this.data.idIndex
            app.globalData.ischooseschool = this.data.ischooseschool
            app.globalData.major = this.data.major
            app.globalData.multiIndex = this.data.multiIndex
            app.globalData.name = this.data.name
            app.globalData.number = this.data.number
            app.globalData.school = this.data.school
            app.globalData.identity = this.data.identity
            console.log("录入成功")
          },
        })
      }
      else 
      {
        db.collection('userInfo').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            _id: app.globalData.openid,
            name: app.globalData.userInfo.nickName,
            identity: this.data.identity,
            school: this.data.school,
            major: this.data.major,
            classnumber: this.data.classnumber,
            number: this.data.number,
            ischooseschool: this.data.ischooseschool,
            clIndex: this.data.clIndex,
            idIndex: this.data.idIndex,
            multiIndex: this.data.multiIndex,
            headurl: app.globalData.userInfo.avatarUrl,
            follownumber: 0,
            fansnumber: 0,
            growthvalue: 0
          },
          success: res => {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            app.globalData.clIndex = this.data.clIndex
            app.globalData.classnumber = this.data.classnumber
            app.globalData.idIndex = this.data.idIndex
            app.globalData.ischooseschool = this.data.ischooseschool
            app.globalData.major = this.data.major
            app.globalData.multiIndex = this.data.multiIndex
            app.globalData.name = this.data.name
            app.globalData.number = this.data.number
            app.globalData.school = this.data.school
            app.globalData.identity = this.data.identity
            console.log("录入成功")
          },
        })
      }
    }
    setTimeout(function() {
      wx.navigateBack({
        delta: 1
      })
    }, 1300)
  },
  onnamebindblur(e) {
    if (e.detail.value) {
      this.setData({
        name: e.detail.value,
        currentname: e.detail.value
      })
    }
  },
  onnumbindblur(e) {
    if (e.detail.value) {
      this.setData({
        number: e.detail.value,
        currentnumber: e.detail.value
      })
    }
  },
  onmajorbindblur(e) {
    if (e.detail.value) {
      this.setData({
        major: e.detail.value,
        currentmajor: e.detail.value
      })
    }
  },
  idBindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      idIndex: e.detail.value,
      identity: this.data.idArray[e.detail.value],
      isidchange: true
    })
  },
  clBindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      clIndex: e.detail.value,
      classnumber: e.detail.value,
      isclasschange: true
    })
  },
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
      school: this.data.multiArray[2][this.data.multiIndex[2]],
      isschoolchange: true,
      ischooseschool: true
    })
  },
  bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['北京市']
            data.multiArray[2] = ['北京大学', '清华大学', '中国人民大学', '北京航空航天大学', '北京师范大学']
            break
          case 1:
            data.multiArray[1] = ['郑州市', '洛阳市', '南阳市', '新乡市']
            data.multiArray[2] = ['郑州大学', '河南大学新区', '河南农业大学', '河南中医药大学', '华北水利水电大学']
            break
          case 2:
            data.multiArray[1] = ['秦皇岛市', '保定市', '石家庄市']
            data.multiArray[2] = ['燕山大学', '东北大学秦皇岛分校']
            break
          case 3:
            data.multiArray[1] = ['厦门市', '福州市']
            data.multiArray[2] = ['厦门大学', '集美大学', '厦门理工学院']
            break
          case 4:
            data.multiArray[1] = ['上海市']
            data.multiArray[2] = ['复旦大学', '上海交通大学', '同济大学', '华东师范大学', '华东理工大学', '上海财经大学', '上海大学']
            break
          case 5:
            data.multiArray[1] = ['成都市', '南充市']
            data.multiArray[2] = ['四川大学', '电子科技大学', '西南交通大学', '西南财经大学', '成都理工大学', '西南石油大学']
            break
          case 6:
            data.multiArray[1] = ['沈阳市', '大连市', '阜新市']
            data.multiArray[2] = ['东北大学', '辽宁大学', '中国医科大学', '沈阳工业大学']
            break
          case 7:
            data.multiArray[1] = ['武汉市', '宜昌市', '荆州市']
            data.multiArray[2] = ['武汉大学', '华中科技大学', '华中师范大学', '武汉理工大学', '华中农业大学', '中南财经政法大学', '湖北大学', '武汉科技大学', '中南民族大学']
            break
        }
        data.multiIndex[1] = 0
        data.multiIndex[2] = 0
        break
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['北京大学', '清华大学', '中国人民大学', '北京航空航天大学', '北京师范大学', '北京理工大学', '北京交通大学', '中央财经大学', '北京外国语大学']
                break
            }
            break
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['郑州大学', '河南大学', '河南农业大学', '河南中医药大学', '华北水利水电大学']
                break
              case 1:
                data.multiArray[2] = ['河南科技大学', '解放军外国语学院', '洛阳师范学院', '洛阳理工学院']
                break
              case 2:
                data.multiArray[2] = ['南阳理工学院', '南阳师范学院']
                break
              case 3:
                data.multiArray[2] = ['河南师范大学', '新乡医学院']
                break
            }
            break
          case 2:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['燕山大学', '东北大学秦皇岛分校']
                break
              case 1:
                data.multiArray[2] = ['河北大学', '河北农业大学']
                break
              case 2:
                data.multiArray[2] = ['河北医科大学', '河北科技大学', '河北工程大学', '石家庄铁道学院']
                break
            }
            break
          case 3:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['厦门大学', '集美大学', '厦门理工学院']
                break
              case 1:
                data.multiArray[2] = ['福州大学', '福州师范大学', '福州农林大学', '福建医科大学', '福建中医药大学']
                break
            }
            break
          case 4:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['复旦大学', '上海交通大学', '同济大学', '华东师范大学', '华东理工大学', '上海财经大学', '上海大学']
                break
            }
            break
          case 5:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['四川大学', '电子科技大学', '西南交通大学', '西南财经大学', '成都理工大学', '西南石油大学']
                break
              case 1:
                data.multiArray[2] = ['西华师范大学', '川北医学院']
                break
            }
            break
          case 6:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['东北大学', '辽宁大学', '中国医科大学', '沈阳工业大学']
                break
              case 1:
                data.multiArray[2] = ['大连理工大学', '东北财经大学', '大连海事大学', '大连医科大学', '辽宁师范大学']
                break
              case 2:
                data.multiArray[2] = ['辽宁工程技术大学']
                break
            }
            break
          case 7:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['武汉大学', '华中科技大学', '华中师范大学', '武汉理工大学', '华中农业大学', '中南财经政法大学', '湖北大学', '武汉科技大学', '中南民族大学']
                break
              case 1:
                data.multiArray[2] = ['三峡大学']
                break
              case 2:
                data.multiArray[2] = ['长江大学']
                break
            }
            break
        }
        data.multiIndex[2] = 0
        break
    }
    console.log(data.multiIndex)
    this.setData(data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /*if (!this.data.ischangename) {
      this.setData({
        userInfo: app.globalData.userInfo,
        name: app.globalData.userInfo.nickName
      })
    } else {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }*/
    this.setData({
      userInfo: app.globalData.userInfo,
      name: app.globalData.name,
      identity: app.globalData.identity,
      idIndex: app.globalData.idIndex,
      classnumber: app.globalData.classnumber,
      clIndex: app.globalData.clIndex,
      major: app.globalData.major,
      school: app.globalData.school,
      multiIndex: app.globalData.multiIndex,
      number: app.globalData.number,
      ischangename: app.globalData.isnamechange,
      ischooseschool: app.globalData.ischooseschool
    })
    var that = this
    db.collection('userInfo').where({
        _openid: app.globalData.openid
      })
      .get({
        success(res) {
          // res.data 包含该记录的数据
          console.log(res.data)
          if (res.data[0]) {
            that.setData({
              isexist: true,
              id: res.data[0]._id //没用了
            })
          }
        }
      })
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
          switch (data.multiIndex[0]) {
            case 0:
              data.multiArray[1] = ['北京市']
              break
            case 1:
              data.multiArray[1] = ['郑州市', '洛阳市', '南阳市', '新乡市']
              break
            case 2:
              data.multiArray[1] = ['秦皇岛市', '保定市', '石家庄市']
              break
            case 3:
              data.multiArray[1] = ['厦门市', '福州市']
              break
            case 4:
              data.multiArray[1] = ['上海市']
              break
            case 5:
              data.multiArray[1] = ['成都市', '南充市']
              break
            case 6:
              data.multiArray[1] = ['沈阳市', '大连市', '阜新市']
              break
            case 7:
              data.multiArray[1] = ['武汉市', '宜昌市', '荆州市']
              break
          }
          switch (data.multiIndex[0]) {
            case 0:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['北京大学', '清华大学', '中国人民大学', '北京航空航天大学', '北京师范大学', '北京理工大学', '北京交通大学', '中央财经大学', '北京外国语大学']
                  break
              }
              break
            case 1:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['郑州大学', '河南大学', '河南农业大学', '河南中医药大学', '华北水利水电大学']
                  break
                case 1:
                  data.multiArray[2] = ['河南科技大学', '解放军外国语学院', '洛阳师范学院', '洛阳理工学院']
                  break
                case 2:
                  data.multiArray[2] = ['南阳理工学院', '南阳师范学院']
                  break
                case 3:
                  data.multiArray[2] = ['河南师范大学', '新乡医学院']
                  break
              }
              break
            case 2:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['燕山大学', '东北大学秦皇岛分校']
                  break
                case 1:
                  data.multiArray[2] = ['河北大学', '河北农业大学']
                  break
                case 2:
                  data.multiArray[2] = ['河北医科大学', '河北科技大学', '河北工程大学', '石家庄铁道学院']
                  break
              }
              break
            case 3:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['厦门大学', '集美大学', '厦门理工学院']
                  break
                case 1:
                  data.multiArray[2] = ['福州大学', '福州师范大学', '福州农林大学', '福建医科大学', '福建中医药大学']
                  break
              }
              break
            case 4:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['复旦大学', '上海交通大学', '同济大学', '华东师范大学', '华东理工大学', '上海财经大学', '上海大学']
                  break
              }
              break
            case 5:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['四川大学', '电子科技大学', '西南交通大学', '西南财经大学', '成都理工大学', '西南石油大学']
                  break
                case 1:
                  data.multiArray[2] = ['西华师范大学', '川北医学院']
                  break
              }
              break
            case 6:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['东北大学', '辽宁大学', '中国医科大学', '沈阳工业大学']
                  break
                case 1:
                  data.multiArray[2] = ['大连理工大学', '东北财经大学', '大连海事大学', '大连医科大学', '辽宁师范大学']
                  break
                case 2:
                  data.multiArray[2] = ['辽宁工程技术大学']
                  break
              }
              break
            case 7:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['武汉大学', '华中科技大学', '华中师范大学', '武汉理工大学', '华中农业大学', '中南财经政法大学', '湖北大学', '武汉科技大学', '中南民族大学']
                  break
                case 1:
                  data.multiArray[2] = ['三峡大学']
                  break
                case 2:
                  data.multiArray[2] = ['长江大学']
                  break
              }
              break
          }
    this.setData(data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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