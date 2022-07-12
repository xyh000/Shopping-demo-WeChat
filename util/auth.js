function checkAuth(callback){
  if(wx.getStorageSync('tel')){
    // 处理业务
    callback()
  }else{
    if(wx.getStorageSync('token')){
      wx.navigateTo({
        url: '/pages/telform/telform',
      })
    }else{
      wx.navigateTo({
        url: '/pages/auth/anth',
      })
    }
  }
}

export default checkAuth