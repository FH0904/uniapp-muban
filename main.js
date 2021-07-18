import Vue from 'vue'
import uView from "uview-ui";
import App from './App'
import './env.js'
import http from './service/methods.js'

Vue.config.productionTip = false

App.mpType = 'app'

// 全局注册http方法
Vue.prototype.$http = http

// 引入uview
Vue.use(uView);

// 混入公共方法
Vue.mixin({
	// 混入切换tabbar方法
  methods:{
    setTabBarIndex(index){
      if (typeof this.$mp.page.getTabBar === 'function' &&
        this.$mp.page.getTabBar()) {
        this.$mp.page.getTabBar().setData({
          selected:index
        })
      }
    }
  }
})
const app = new Vue({
    ...App
})
app.$mount()
