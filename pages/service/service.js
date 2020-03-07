// pages/service/service.js
import Toast from '../../vant/toast/toast';
import Notify from '../../vant/notify/notify';
const db = wx.cloud.database()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advice: '',
    phonenumber: ''
  },
  clickSave() {
    db.collection('information').add({
      data: {
        advice: this.data.advice,
        phonenumber: this.data.phonenumber,
        time: util.formatTime(new Date())
      },
      success(res) {
        console.log(res)
        Notify({
          text: '提交成功',
          duration: 1000,
          selector: '#custom-selector',
          backgroundColor: '#1989fa'
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1300)
      },
      fail: console.error
    })
  },
  serviceOnBindChange(e) {
    this.setData({
      advice: e.detail
    })
  },
  phoneOnBindChange(e) {
    this.setData({
      phonenumber: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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