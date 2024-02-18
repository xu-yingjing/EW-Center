import mqtt from '../../utils/mqtt.min.js'

Page({
  data: {
    phoneNumber: '',
    password: '',
    client: null,
    host: 'wxs://xuyingjing.top:8084/mqtt',
    waitCb: '',
  },

  Uint8ArrayToString (uint8ArrayData) {
    var stringData = "";
    for (var index = 0; index < uint8ArrayData.length; index++) {
      stringData += String.fromCharCode(uint8ArrayData[index]);
    }
    return stringData
  },

  onLoad(options) {
    this.setData({'phoneNumber': options.phoneNumber})
    this.setData({'password': options.password})
  },

  onShow() {
    this.setData({'client': null})
    const clientId = new Date().getTime();
    this.data.client = mqtt.connect(
      this.data.host,
      {
        protocolVersion: 4,
        clientId: clientId,
        username: 'User',
        password: '977930',
        reconnectPeriod: 1000,
        connectTimeout: 5 * 1000,
        resubscribe: true,
        clean: false,
      }
    )
    this.data.client.on(
      'connect',
      (connack) => {
        this.data.client.subscribe({'ED-RemoterCb': {qos: 0}})
      }
    )
    this.data.client.on("message", (topic, payload) => {
      if (topic === "ED-RemoterCb") {
        if (this.Uint8ArrayToString(payload) === this.data.waitCb) {
          wx.vibrateLong()
          this.setData({'waitCb': ''})
        }
      }
    })
  },

  onHide() {
    this.data.client.unsubscribe(['ED-RemoterCb'])
    this.data.client.end()
  },

  onUnload() {
    this.data.client.unsubscribe(['ED-RemoterCb'])
    this.data.client.end()
  },

  onButtonUp(e) {
    if (this.data.client && this.data.client.connected) {
      this.setData({'waitCb': 'Up'})
      this.data.client.publish('ED-Remoter', 'Up');
    }
  },

  onButtonUpLong(e) {
    if (this.data.client && this.data.client.connected) {
      this.setData({'waitCb': 'UpLong'})
      this.data.client.publish('ED-Remoter', 'UpLong');
    }
  },

  onButtonDown(e) {
    if (this.data.client && this.data.client.connected) {
      this.setData({'waitCb': 'Down'})
      this.data.client.publish('ED-Remoter', 'Down');
    }
  },

  onButtonDownLong(e) {
    if (this.data.client && this.data.client.connected) {
      this.setData({'waitCb': 'DownLong'})
      this.data.client.publish('ED-Remoter', 'DownLong');
    }
  },

  onButtonLock(e) {
    if (this.data.client && this.data.client.connected) {
      this.setData({'waitCb': 'Lock'})
      this.data.client.publish('ED-Remoter', 'Lock');
    }
  },

  onButtonStop(e) {
    if (this.data.client && this.data.client.connected) {
      this.setData({'waitCb': 'Stop'})
      this.data.client.publish('ED-Remoter', 'Stop');
    }
  }
})
