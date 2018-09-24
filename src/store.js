import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tempArr:{},
		haveToken:''
	},
	mutations: {
		setTempArr:(state , item) => {
			state.tempArr = item
		},
		setToken:(state , item) => {
			state.haveToken = item
		}
	},
	actions: {
		setTempArr: ({ commit }, item) => {
			commit('setTempArr', item)
		},
		setToken: ({ commit }, item) => {
			commit('setToken', item)
		}
	}
})
