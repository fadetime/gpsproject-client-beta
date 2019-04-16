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
import dayShiftHome from './views/dayShiftHome.vue'
import billPage from './views/bill.vue'
import checkPage from './views/checker.vue'
import checkPage_day from './views/checker_dayShift.vue'
import dayMissionPool from './views/dayMissionPool.vue'
import dayDriverMissionPage from './views/dayDriverMissionPage.vue'
import brokeBoxReport from './views/brokeBoxReport.vue'
import brokeBoxReportCheck from './views/brokeBoxReport_check.vue'
import noticePage from './views/notice.vue'
import countBox from './views/countBox.vue'
import engineOil from './views/engineOil.vue'
import tripCount from './views/tripCount.vue'
import report from './views/report.vue'
import report_basket from './views/report_detail/report_basket.vue'

import AuthGuard from './auth-guard'
import fixCarGuard from './fixCar-guard'
import searchGuard from './search-guard'
import dayShiftGuard from './dayShift-guard'
import breakBoxGuard from './breakBoxReport-guard'

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
      path: '/bill',
      name: 'billPage',
      component: billPage,
      beforeEnter: AuthGuard
    },
    {
      path: '/check',
      name: 'checkPage',
      component: checkPage,
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
    },
    {
      path: '/dayshifthome',
      name: 'dayShiftHome',
      component: dayShiftHome,
      beforeEnter: dayShiftGuard
    },
    {
      path: '/dayPool',
      name: 'dayMissionPool',
      component: dayMissionPool
    },
    {
      path: '/ddmpage',
      name: 'dayDriverMissionPage',
      component: dayDriverMissionPage
    },
    {
      path: '/brokeboxreport',
      name: 'brokeboxreport',
      component: brokeBoxReport,
      beforeEnter: breakBoxGuard
    },
    {
      path: '/brokeboxreportcheck',
      name: 'brokeboxreportcheck',
      component: brokeBoxReportCheck
    },
    {
      path: '/notice',
      name: 'noticePage',
      component: noticePage
    },
    {
      path: '/countbox',
      name: 'countBox',
      component: countBox
    },
    {
      path: '/engineoil',
      name: 'engineOil',
      component: engineOil
    },
    {
      path: '/tripCount',
      name: 'tripCount',
      component: tripCount
    },
    {
      path: '/checkPage_day',
      name: 'checkPage_day',
      component: checkPage_day
    },
    {
      path: '/report',
      name: 'report',
      component: report
    },
    {
      path: '/report_basket',
      name: 'report_basket',
      component: report_basket
    }
  ]
})
