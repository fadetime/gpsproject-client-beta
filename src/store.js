import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tempArr:{},
		allMission:[]
	},
	mutations: {
		setTempArr:(state , item) => {
			state.tempArr = item
		},
		setAllMission:(state , item) => {
			state.allMission = item
		}
	},
	actions: {
		setTempArr: ({ commit }, item) => {
			commit('setTempArr', item)
		},
		setAllMission: ({ commit }, item) => {
			commit('setAllMission', item)
		}
	}
})
