//index.js
//获取应用实例
/* jshint esversion: 6 */
const app = getApp();

Page({
  data: {
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    imgUrls: [
      {
        url: "../../assets/images/banner-01.png"
      },
      {
        url: "../../assets/images/banner-01.png"
      },
      {
        url: "../../assets/images/banner-01.png"
      }
    ]
  }
});
