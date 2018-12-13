import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/Home.vue'
import HistoryPage from './views/History.vue'
import Login from './views/Login.vue'
import Setup from './views/Setup.vue'
import DetailPage from './views/DetailPage.vue'
import Finish from './views/Finish.vue'
import HistoryDetail from './views/HistoryDetail.vue'
import fixCar from './views/fixCar.vue'
import search from './views/Search.vue'
import AuthGuard from './auth-guard'
import fixCarGuard from './fixCar-guard'
import searchGuard from './search-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      beforeEnter: AuthGuard
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryPage,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/setup',
      name: 'setup',
      component: Setup,
      beforeEnter: AuthGuard
    },
    {
      path: '/detailpage',
      name: 'DetailPage',
      component: DetailPage,
      beforeEnter: AuthGuard
    },
    {
      path: '/finish',
      name: 'Finish',
      component: Finish,
      beforeEnter: AuthGuard
    },
    {
      path: '/historydetail',
      name: 'HistoryDetail',
      component: HistoryDetail,
      beforeEnter: AuthGuard
    },
    {
      path: '/fixcar',
      name: 'fixCar',
      component: fixCar,
      beforeEnter: fixCarGuard
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      beforeEnter: searchGuard
    }
  ]
})
