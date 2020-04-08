module.exports = (url, data) => {
    return new Promise((resolve, reject) => {
        wx.request({
            // 由于url中使用了占位符，所以url请求地址的引号要改为 【反引号】
            url: `https://locally.uieee.com/${url}`,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: resolve,
            fail: reject
        });
    });
}