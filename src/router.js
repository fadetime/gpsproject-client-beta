import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/Home.vue'
import HistoryPage from './views/History.vue'
import Login from './views/Login.vue'
import Setup from './views/Setup.vue'
import DetailPage from './views/DetailPage.vue'
import Finish from './views/Finish.vue'
import HistoryDetail from './views/HistoryDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryPage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/setup',
      name: 'setup',
      component: Setup
    },
    {
      path: '/detailpage',
      name: 'DetailPage',
      component: DetailPage
    },
    {
      path: '/finish',
      name: 'Finish',
      component: Finish
    },
    {
      path: '/historydetail',
      name: 'HistoryDetail',
      component: HistoryDetail
    },
  ]
})
