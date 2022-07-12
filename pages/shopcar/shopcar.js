import checkAuth from "../../util/auth";
import request from "../../util/request";

// pages/shopcar/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除'
    }],
    cartlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    checkAuth(() => {
      // 每次来到购物车页面，重新取一遍数据
      let {
        nickName
      } = wx.getStorageSync('token')
      let tel = wx.getStorageSync('tel')
      request({
        url: `/carts?_expand=good&username=${nickName}&tel=${tel}`
      }).then(res => {
        this.setData({
          cartlist: res
        })
      })
    })
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
  // 点击删除按钮
  slideButtonTap(evt) {
    var id = evt.currentTarget.dataset.item.id
    this.setData({
      cartlist: this.data.cartlist.filter(item=>item.id != id)
    })
    request({
      url:`/carts/${id}`,
      method:'delete'
    })
  },
  // 选择商品
  handleTap(evt) {
    var item = evt.currentTarget.dataset.item
    item.checked = !item.checked
    this.handleUpdate(item)
  },
  // -处理函数
  handleMinus(evt) {
    var item = evt.currentTarget.dataset.item
    item.number = item.number+1
    this.handleUpdate(item)
  },

  // +处理函数
  handleAdd(evt){
    var item = evt.currentTarget.dataset.item
    item.number = item.number>1 ? item.number-1 : item.number
    this.handleUpdate(item)
  },

  // 更新数据
  handleUpdate(item) {
    this.setData({
      cartlist: this.data.cartlist.map(data => {
        if (data.id === item.id) {
          // 直接返回更新完之后的数据
          return item
        }
        return data
      })
    })
    // 还要更新远端的数据，否则一刷新就会还原
    request({
      url: `/carts/${item.id}`,
      method: 'put',
      data: {
        "username": item.username,
        "tel": item.tel,
        "goodId": item.goodId,
        "number": item.number,
        "checked": item.checked,
      }
    })
  },
  handleAllChange(evt){
    if(evt.detail.value.length===0){
      // 未全选
      this.setData({
        // 返回一个对象加上()
        cartlist:this.data.cartlist.map(item=>({
          ...item,
          checked:false
        }))
      })
      // 
    }else{
      // 全选
      this.setData({
        cartlist:this.data.cartlist.map(item=>({
          ...item,
          checked:true
        }))
      })

    }
  }

})