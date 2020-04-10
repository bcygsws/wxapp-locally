// pages/list/list.js
/* jshint esversion:6 */
const fetch = require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据结构
    // 九宫格按钮点击，页面跳转后的标题
    category: {},
    // 该分类下的列表数据
    shops: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 测试代码 console.log(1)和console.log(2)谁先执行，因为数据请求是异步操作
    /**
     * 测试发现：1先于2执行，这个执行速度是不一定的，也取决于所请求数据接口的响应速度。为此，做一个双保险，在onLoad阶段
     * 将请求的数据挂载到data上。在onReady()阶段，进行判断，this.data.category.name有值以后，再设置当前页面的标题，使用api,
     * wx.setNavigationBarTitle({
       title: 'String',
       success: function(res) {
         // success
       }
     })
     * 
     */
    // console.log(1);
    // 拿到导航过来时传递的cat参数:是每个类别的id值，options是一个对象
    // console.log(options);
    fetch('categories/' + options.cat).then(res => {
      console.log(res);
      // 将数据挂载的原因是，方便onReady中取用
      this.setData({
        category: res.data
      });
      wx.setNavigationBarTitle({
        title: res.data.name
      });
      // 从时间顺序来讲，先加载完分类后，拿到分类，然后再加载该类对应的商铺信息
      /**
       * 说明：
       * 1.第二个参数：是向数据接口传递的参数，_page表示页数，_limit表示该页的最多数据条数
       * 2.直接这样书写，还是出现了函数嵌套，这样就失去了promise的价值了
       */
      // fetch(`categories/${options.cat}/shops`, { _page: 1, _limit: 10 }).then(res => {
      //   console.log(res);
      // });
      return fetch(`categories/${options.cat}/shops`, { _page: 1, _limit: 10 });
    }).then(res => {
      console.log(res);
      this.setData({
        shops: res.data
      });
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(2);
    if (this.data.category.name) {
      wx.setNavigationBarTitle({
        title: this.data.category.name
      });
    }
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