import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tempArr:{},
		allMission:[],
		haveToken:''
	},
	mutations: {
		setTempArr:(state , item) => {
			state.tempArr = item
		},
		setAllMission:(state , item) => {
			state.allMission = item
		},
		setToken:(state , item) => {
			state.haveToken = item
		}
	},
	actions: {
		setTempArr: ({ commit }, item) => {
			commit('setTempArr', item)
		},
		setAllMission: ({ commit }, item) => {
			commit('setAllMission', item)
		},
		setToken: ({ commit }, item) => {
			commit('setToken', item)
		}
	}
})
