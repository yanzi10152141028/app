import Vue from 'vue'
import App from './App'
import "../static/css/weui.css"
import "../static/css/common.scss"
import Fly from 'flyio/dist/npm/wx'
var fly = new Fly
Vue.prototype.$http = fly
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()
