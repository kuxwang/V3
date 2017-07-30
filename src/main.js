// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/'
import './config/rem'
import fastclick from 'fastclick'
import 'vue2-animate/dist/vue2-animate.css'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import VueLazyload from 'vue-lazyload'

Vue.use(Vuex)
Vue.use(MintUI)
Vue.config.productionTip = false
// fastclick.attach(document.body)

// Vue.use(VueLazyload, {
//   loading: require('./assets/images/default.gif')
// })

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
