import request from '../../util/request'
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    looplist: [],
    goodslist: []
  },

  current: 1,
  total: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.renderSwiper(),
      this.renderGoods()
  },

  renderSwiper() {
    request({
      url: '/recommends'
    }).then(res => {
      // console.log(res);
      this.setData({
        looplist: res
      })
    })
  },
  renderGoods() {
    request({
      url: `/goods?_page=${this.current}&_limit=5`
    }, true).then(res => {
      this.total = res.total
      this.setData({
        // goodslist: this.data.goodslist.concat(res)
        goodslist: [...this.data.goodslist, ...res.list]
      })
    })
  },

  handleEvent(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  handleChangePage(evt){
    var id = evt.currentTarget.dataset.id
    var title = evt.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`,
    })
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
    // 因为模拟器两秒会回去，但是真机不会回去，所以在得到数据后要让它回去
    setTimeout(()=>{
      // 更新数据了
      wx.stopPullDownRefresh()//停止下拉刷新
    },1000)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.goodslist.length < this.total) {
      this.current++
      this.renderGoods()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

})