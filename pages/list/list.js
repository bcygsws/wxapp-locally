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
    shops: [],
    // 设置初始页码
    pageIndex: 0,
    // 每页可容纳的商铺列表数量
    pageSize: 20,
    // 是否加载完成
    hasMore: true

  },
  /**
       * 封装一个函数loadMore来加载商铺列表数据
       * loadMore函数中，this.data.category.id依赖于onLoad中获取，所以，该代码应该放在onLoad下面，否则数据接口加载很慢甚至出现
       * 加载超时的错误
       */
  loadMore: function () {
    if (!this.data.hasMore) return false;
    // ES6语法解构赋值
    let { pageIndex, pageSize } = this.data;
    // let pageIndex = this.data.pageIndex;
    // let pageSize = this.data.pageSize;
    // 此处用pageIndex++会报错，原因是：使用pageIndex++(先赋值后加1),初始时a=pageIndex++=0，pageIndex才变成1，然而_page最小值为1
    let params = { _page: ++pageIndex, _limit: pageSize };
    fetch(`categories/${this.data.category.id}/shops`, params)
      .then(res => {
        console.log(res);//能拿到数据，但是商铺列表无法渲染出来.shops（存放商铺列表）必须使用setData()设置，提醒小程序要渲染页面
        /**
         * 1.此处X-total-count是数据接口中header里面的x-total-count
         * 2.向上取整方法：Math.ceil(totalCount/pageSize)，得到该类下商铺列表的最多页数
         * 
         */
        const totalCount = parseInt(res.header['x-total-count']);
        // console.log(totalCount);
        // 有没有更多呢？在data上挂载一个布尔变量hasMore
        let hasMore = totalCount > pageIndex * pageSize;
        this.setData({
          shops: this.data.shops.concat(res.data),
          // 必须将pageIndex也设置回去，这个参数影响shops的值
          pageIndex,
          hasMore
        });

      });
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
    // 拿到导航过来时传递的cat_id参数:是每个类别的id值，options是一个对象
    // console.log(options);
    /**
     * return是在下拉刷新时加的，目的是让异步请求加载完成后，得到一个promise实例，
     * promise实例.then(()=>{wx.stopPullDownRefresh();});
     * 
     */
    return fetch(`categories/${options.cat_id}`).then(res => {
      console.log(res);
      // 将数据挂载的原因是，方便onReady中取用
      this.setData({
        /* 
        注意category赋值为res.data后，对象变成了{id:1,name:"美食",icon:"http://ww1.sinaimg.cn/large/006ThXL5ly1fj8w5i2onyj302u02umwz.jpg"}。category里面存放的键实际上有id,name和icon三个，没有cat_id
        cat_id类似于形参，data中的id为实参，在loadMore()函数中，引用时键为id，而非cat_id
        */
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
      // fetch(`categories/${options.cat_id}/shops`, { _page: 1, _limit: 10 }).then(res => {
      //   console.log(res);
      // });
      // return fetch(`categories/${options.cat_id}/shops`, { _page: 1, _limit: 10 });
      this.loadMore();
    });
    //   .then(res => {
    //   console.log(res);
    //   this.setData({
    //     shops: res.data
    //   });
    // });

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
   * 页面相关事件处理函数--监听用户下拉动作
   * 先将app.json文件中window下，enablePullDownRefresh属性设置为true,小程序【下拉】就启用了
   * 实现下拉刷新的时候，重新加载数据(回到应用初次打开时的转态，onLoad时的状态)
   * 
   */
  onPullDownRefresh: function () {
    // 测试代码
    console.log(123);
    // 重新加在数据之前，先把data中的数据设定成初始值,其中pageSize设定为20，是个不变值。category:{}是navigator标签中
    // 传递的参数，进入list页面后，形参cat_id（实参id）是固定值，不用重置
    this.setData({ shops: [], pageIndex: 0, hasMore: true });
    /* 
    bug出现：下拉刷新默认有个3s的延迟。会出现数据重新加载完成了，下拉刷新还存在。我们需要的是，数据重载完成了，立马关闭
    下拉刷新，借助一个api: stopPullDownRefresh()
    解决：把onLoad函数中异步请求数据的代码作为一个promise实例返回(只有异步请求数据完成了，才会返回promise实例)

    TODOS:实现了数据重载完成，立即停止下拉刷新。但是会报一个错误：this.loadMore.then is not a function;
    at pages/list/list page onPullDownRefresh function*/
    const promise = this.loadMore();
    promise.then(() =>
      wx.stopPullDownRefresh()
    );
  },

  /**
   * 页面上拉触底事件的处理函数
   * list.json文件中，"onReachBottomDistance": 20设置页面上拉触底事件触发时，距离页面底部的距离，默认
   * 为50，单位为px,此处将值改小一点，设为20
   * 
   */
  onReachBottom: function () {
    // 测试代码
    console.log('别拉了，触底了');
    // 在这个时机，加载下一页
    // TODO:节流
    // 需要判断一下是否正在加载？否则会出现多次触发问题

    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});