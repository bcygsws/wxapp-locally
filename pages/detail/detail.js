// pages/detail/detail.js
/* jshint esversion:6 */
const fetch = require('../../utils/fetch');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {}
  },
  // 点击轮播图中任意一张图片，开启【图片预览】
  previewHandle: function (e) {
    // 测试代码-测试传入的当前图片url,e.target.dataset.src拿到当前图片url
    console.log(e);
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: this.data.shop.images
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 测试代码：测试商铺列表传递的id值是否成功？
    console.log(options);
    fetch(`shops/${options.id}`).then(res => {
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