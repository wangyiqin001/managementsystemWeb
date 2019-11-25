import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/main.less'
import { getToken } from './api/api'

Vue.config.productionTip = false
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    getToken(localStorage.token).then((res) => {
      if (res.data == 'timeout') {
        next('/')
      } else {
        next()
      }
    })
  }else{
    next()
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
