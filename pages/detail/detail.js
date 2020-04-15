// pages/detail/detail.js
/* jshint esversion:6 */
const fetch = require('../../utils/fetch');
// const util=require('../../utils/com.wxs');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {}
  },
  // 处理数组：如果数组长度>5,截取前5个元素组成的数组。如果数组长度<=5,截取索引0,……arr.length-1 这些元素组成的数组
  filterHandle: function (arr) {
    return arr.filter((item, index, array) => {
      return array.length > 5 ? (index < 5) : index < arr.length;
    });
  },
  // 点击轮播图中任意一张图片，开启【图片预览】
  previewHandle: function (e) {
    // 测试代码-测试传入的当前图片url,e.target.dataset.src拿到当前图片url
    console.log(e);
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: this.filterHandle(this.data.shop.images)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 测试代码：测试商铺列表传递的id值是否成功？
    console.log(options);
    fetch(`shops/${options.item}`).then(res => {
      // 测试代码
      console.log(res);
      this.setData({
        shop: res.data
      });
      wx.setNavigationBarTitle({
        title: res.data.name
      });
    });
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
});