Page({
  data: {
    userInfo: [
      {phoneNumber: "15059789907", password: "977930"},
      {phoneNumber: "13808551007", password: "109651"},
      {phoneNumber: "15059857007", password: "990608"},
    ],
    inputUserInfo: {phoneNumber: "", password: ""},
  },

  onShow() {
    const storagephoneNumber = wx.getStorageSync('phoneNumber') || ""
    const storagepassword = wx.getStorageSync('password') || ""
    this.setData({'inputUserInfo.phoneNumber': storagephoneNumber})
    this.setData({'inputUserInfo.password': storagepassword})
  },

  onPhoneNumberInput(e) {
    this.setData({'inputUserInfo.phoneNumber': e.detail.value})
  },

  onPasswordInput(e) {
    this.setData({'inputUserInfo.password': e.detail.value})
  },

  onLogin(e) {
    let isPhoneNumberExist = false
    for (let index = 0; index < this.data.userInfo.length; index++) {
      const userInfo = this.data.userInfo[index];
      if (userInfo.phoneNumber === this.data.inputUserInfo.phoneNumber) {
        isPhoneNumberExist = true
        if (this.data.inputUserInfo.password === userInfo.password) {
          wx.setStorageSync('phoneNumber', userInfo.phoneNumber)
          wx.setStorageSync('password', userInfo.password)
          wx.redirectTo({
            url: '/pages/ew/ew' +
            '?phoneNumber=' + userInfo.phoneNumber +
            '&password=' + userInfo.password,
          })
          break
        }
        else {
          wx.showToast({title: '密码错误', icon: 'error',})
        }
      }
    }
    if (isPhoneNumberExist == false) {
      wx.showToast({title: '手机号不存在', icon: 'error',})
    }
  }
})
