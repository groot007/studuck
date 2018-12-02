import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../shared/firebase'
import user from './user'
import shared from './shared'

Vue.use(Vuex)


export default new Vuex.Store({
	modules: {
		user: user,
		shared: shared
	}
})