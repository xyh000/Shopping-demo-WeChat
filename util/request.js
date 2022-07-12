function request(params,isHeader=false){
  // 开始前显示loading
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title:'正在加载中'
    })
    wx.request({
      // 接到的参数是个对象把对象展开即可
      ...params,
      // 覆盖地址值
      url:'http://localhost:5000'+params.url,
      success:(res)=>{
        if(isHeader){
          resolve({
            list:res.data,
            total:res.header['X-Total-Count']
          })
        }else{
          resolve(res.data)
        }
      },
      fail:(err)=>{
        reject(err)
      },
      // 结束后隐藏loading
      complete:()=>{
        // 隐藏loading
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  })
}

export default request