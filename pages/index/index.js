//index.js
/* jshint esversion: 6 */
// 引入utils中封装的fetch.js模块
const fetch = require('../../utils/fetch');
Page({
  data: {
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    // imgUrls: [
    //   {
    //     url: "../../assets/images/banner-01.png"
    //   },
    //   {
    //     url: "../../assets/images/banner-01.png"
    //   },
    //   {
    //     url: "../../assets/images/banner-01.png"
    //   }
    // ]
    slides: [],
    categories: []
  },
  /**
   * 生命周期函数：监听页面加载
   * 
   */
  onLoad(options) {
    // 网络请求：小程序中url地址中没有跨域的概念，原因是小程序的代码放在客户端中了，而web开发中是向服务端发送请求，会出现跨域的问题
    /**
     * 1.发送异步请求不再是web开发ajax那套东西
     * 2.没有跨域
     * 3.请求的地址必须在管理后台添加白名单
     * 4.域名必须备案，服务端采用https
     */
    //   wx.request({
    //     url: 'https://api.douban.com/v2/movie/coming_soon',
    //     // 豆瓣的数据接口做的一个约定 content-type为json，而其他情形下，都默认为application/json
    //     header: {
    //       'content-type': 'json'
    //     },
    //     data: {},
    //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //     // header: {}, // 设置请求的 header
    //     success: function (res) {
    //       // success
    //       console.log(res);
    //     },
    //     fail: function () {
    //       // fail
    //     },
    //     complete: function () {
    //       // complete
    //     }
    //   });
    /**
     * 轮播图数据请求
     */
    // success回调中在使用this.setData时，会出现问题。原因是success回调中，this指向的是success的调用者，而非当前page页面实例
    /**
     * 两种解决方案：
     * 1.在作用域范围内(就是this还是page实例的范围内)定义 that=this,在使用this实例的地方用that代替，本例中的page实例
     * API方法：this.setData()
     * 2.使用箭头函数---小程序中对箭头函数的支持很好
     * 
     */
    // var that = this;
    // wx.request({
    //   url: 'https://locally.uieee.com/slides',
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header,默认为application/json
    //   success: res => {
    //     // success
    //     console.log(res.data);
    //     this.setData({
    //       slides: res.data
    //     });
    //   }
    // });
    // wx.request({
    //   url: 'https://locally.uieee.com/categories',
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: res => {
    //     // success
    //     console.log(res.data);
    //     this.setData({
    //       categories: res.data
    //     });
    //   }
    // });
    /* 上面代码重复，仅有url请求地址不一样，可以在utils文件夹内进行封装   */
    fetch('slides').then(res => {
      this.setData({
        slides: res.data
      });
    });
    fetch('categories').then(res => {
      this.setData({
        categories: res.data
      });
    });
  }
});
