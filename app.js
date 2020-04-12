//app.js
// 首页轮播图:数据接口地址:https://locally.uieee.com/slides
// 首页九宫格:数据接口地址:https://locally.uieee.com/categories

// 九宫格中的每个类:例如美食：id=1 https://locally.uieee.com/categories/1/shops 得到美食类下所有店铺数据

// 为数据接口设置请求参数来控制所有数据的分页(_page)显示和每页存放的数据条数(_limit)
// https://locally.uieee.com/categories/1/shops?_page=1&_limit=20 --->衍生出数据加载、上拉加载更多数据、下拉刷新数据(重载onLoad触发时的原始数据)

// 搜索 https://locally.uieee.com/categories/1/shops?_page=1&_limit=2&q=鸡排 表示在第一页中加载最多两条(没有含鸡排的就0条)店铺信息含鸡排的数据





App({
});