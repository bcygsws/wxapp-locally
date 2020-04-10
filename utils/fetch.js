// 此处不能把module.exports改成exports,原因是不能对exports直接赋值，直接赋值会割裂module.exports和
// exports之间的联系
module.exports = (url, data) => {
    return new Promise((resolve, reject) => {
        wx.request({
            // 由于url中使用了占位符，所以url请求地址的引号要改为 【反引号】
            url: `https://locally.uieee.com/${url}`,
            data: data,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: resolve,
            fail: reject
        });
    });
}