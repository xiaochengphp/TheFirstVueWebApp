import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Goods from './components/tab-content/goods/goods'
import Ratings from './components/tab-content/ratings/ratings'
import Seller from './components/tab-content/seller/seller'

import './common/stylus/index.styl' // 公共css样式

Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter({
  linkActiveClass: 'active'
})

router.map({
  '/goods': {
    component: Goods
  },
  '/ratings': {
    component: Ratings
  },
  '/seller': {
    component: Seller
  }
})
router.go('/goods')

router.start(App, '#app')
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })

