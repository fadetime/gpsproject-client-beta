import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import imgUrl from './assets/js/imgUrl'
import TimeFilter from './assets/js/timeFilter'
import DateFilter from './assets/js/dateFilter'
import 'swiper/dist/css/swiper.min.css'
import 'animate.css/animate.min.css'

Vue.filter('imgurl',imgUrl)
Vue.filter('timefilter',TimeFilter)
Vue.filter('dateFilter',DateFilter)
Vue.use(VueMaterial)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
