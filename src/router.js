import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/Home.vue'
import HistoryPage from './views/History.vue'
import Login from './views/Login.vue'

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
    }
  ]
})
