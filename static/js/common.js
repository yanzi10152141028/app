// 获取时间
export default{
    getDateTime (params) {
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()
      var hours = now.getHours()
      var min = now.getMinutes()
      var s = now.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      return year + '/' + month + '/' + date + ' ' + hours + ':' + min + ':' + s
    }
  }
  