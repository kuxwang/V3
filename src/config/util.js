import axios from 'axios'
import qs from 'qs'
let util = {
  siteInfo: {
    siteroot: 'https://xcxtest.wshoto.com/app/index.php',
    uniacid: '3',
    acid: '3',
    multiid: '',
    version: '1.0.0'
  },
  /**
   构造微擎地址,
   @params action 微擎系统中的controller, action, do，格式为 'wxapp/home/navs'
   @params querystring 格式为 {参数名1 : 值1, 参数名2 : 值2}
   */
  url (action, querystring) {
    var url = this.siteInfo.siteroot + '?i=' + this.siteInfo.uniacid + '&t=' + this.siteInfo.multiid + '&v=' + this.siteInfo.version + '&from=wxapp&'
    if (action) {
      action = action.split('/')
      if (action[0]) {
        url += 'c=' + action[0] + '&'
      }
      if (action[1]) {
        url += 'a=' + action[1] + '&'
      }
      if (action[2]) {
        url += 'do=' + action[2] + '&'
      }
    }
    if (querystring && typeof querystring === 'object') {
      for (let param in querystring) {
        // if (param && querystring.hasOwnProperty(params) && querystring[param]) {
        //     url += param + '=' + querystring[param] + '&';
        // }
        if (param && querystring[param]) {
          url += param + '=' + querystring[param] + '&'
        }
      }
    }
    return url
  },
  getQuery (url) {
    var theRequest = []
    if (url.indexOf('?') !== -1) {
      var str = url.split('?')[1]
      var strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        if (strs[i].split('=')[0] && unescape(strs[i].split('=')[1])) {
          theRequest[i] = {
            'name': strs[i].split('=')[0],
            'value': unescape(strs[i].split('=')[1])
          }
        }
      }
    }
    return theRequest
  },
  /*
  * 获取链接某个参数
  * url 链接地址
  * name 参数名称
  */
  getUrlParam (url, name) {
    var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`) // 构造一个含有目标参数的正则表达式对象
    var r = url.split('?')[1].match(reg)  // 匹配目标参数
    if (r != null) return unescape(r[2])
    return null // 返回参数值
  },
  instance: axios.create({
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }],
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }),
  request: (opt) => (
    this.instance[opt.type](opt.url)
      .then(res => (
         opt.callback(res)
      ))
      .catch(res=>{

      })
  )
}
