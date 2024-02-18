Page({
  data: {
    phoneNumber: '',
    password: '',
  },

  onLoad(options) {
    this.setData({'phoneNumber': options.phoneNumber})
    this.setData({'password': options.password})
  },

  onEDRemoter(e) {
    wx.navigateTo({
      url: '/pages/ed-remoter/ed-remoter' +
      '?phoneNumber=' + this.data.phoneNumber +
      '&password=' + this.data.password
    })
  }
})
