import request from "../../util/request";
import checkAuth from "../../util/auth";

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    currentIndex: 0,
    commentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log('基于上个列表页面传来的id,跟后端取当前页面id对应的详细信息',options);
    // 设置导航栏标题
    // console.log('detial',options);
    var id = options.id
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.getDetailInfo(id),
    this.getDetailComments()
  },

  getDetailInfo(id) {
    request({
      url: `/goods/${id}`
    }).then(res => {
      this.setData({
        info: res
      })
    })
  },
  getDetailComments() {
    request({
      url: '/comments'
    }).then(res => {
      this.setData({
        commentList: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleTap(evt) {
    wx.previewImage({
      current: evt.currentTarget.dataset.current, //当前显示图片的http链接
      //需要预览的图片http链接列表
      // map 根据返回值返回一个新的数组
      urls: this.data.info.slides.map(item => `http://localhost:5000${item}`)
    })
  },
  handleActive(evt) {
    this.setData({
      currentIndex: evt.currentTarget.dataset.index
    })
  },
  handleAdd() {
    checkAuth(() => {
      console.log('准备加入购物车');
      let username = wx.getStorageSync('token').nickName
      let tel = wx.getStorageSync('tel')
      var goodId = this.data.info.id
      request({
        url: "/carts",
        // 要查的数据
        data: {
          tel,
          goodId,
          username
        }
      }).then(res => {
        // 如果不存在，把数据放到购物车里
        if (res.length === 0) {
          return request({
            url: '/carts',
            method: 'post',
            data: {
              "username": username,
              "tel": tel,
              "goodId": goodId,
              "number": 1,
              "checked": false
            }
          })
        } else {
          // 如果取回来的数据不为空就改变数量
          return request({
            url: `/carts/${res[0].id}`,
            method: 'put',
            data: {
              ...res[0],
              number: res[0].number + 1
            }
          })
        }
      }).then(res => {
        wx.showToast({
          title: '加入购物车成功',
        })
      })
    })
  },
  handleChange() {
    wx.switchTab({
      url: '/pages/shopcar/shopcar',
    })
  }
})