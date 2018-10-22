import Vue from 'vue'
import Vuex from 'vuex'
import Switch from '../public/Language/switch'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tempArr:{},
		haveToken:'',
		needDoNum:0,
		choiseDay:'today',
		language:'',
		lang:''
	},
	mutations: {
		setTempArr:(state , item) => {
			state.tempArr = item
		},
		setToken:(state , item) => {
			state.haveToken = item
		},
		setDoNum:(state , item) => {
			state.needDoNum = item
		},
		setChoiseDay:(state , item) => {
			state.choiseDay = item
		},
		setLanguage:(state,payload)=>{
			state.language=Switch(payload)
			state.lang = payload
			localStorage.setItem('lang',payload)
		},
	},
	actions: {
		setTempArr: ({ commit }, item) => {
			commit('setTempArr', item)
		},
		setToken: ({ commit }, item) => {
			commit('setToken', item)
		},
		setDoNum: ({ commit }, item) => {
			commit('setDoNum', item)
		},
		setChoiseDay: ({ commit }, item) => {
			commit('setChoiseDay', item)
		},
		setLanguage:({commit},payload)=>{
			commit('setLanguage',payload)
		},
	},
	getters:{
		getLanguage:(state)=>{
			return state.language
		}
	}
})
