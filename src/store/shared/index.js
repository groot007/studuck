import firebase from '../../shared/firebase'

export default {
	state: {
		loading: false,
    	error: null,
		jsonData: null
	},
	mutations: {
		setLoading (state, payload) {
		  state.loading = payload
		},
		setError (state, payload) {
		  state.error = payload
		},
		clearError (state) {
		  state.error = null
		}
	},
	actions: {
		getJsonData (state, user) {
			if (!this.state.jsonData && navigator.onLine) {
				this.state.jsonData = firebase.db.collection("users-schedules").doc(user).get();
			}
			return this.state.jsonData;
		}
	},
	getters: {
	    loading (state) {
	      return state.loading
	    },
	    error (state) {
	      return state.error
	    }
	}
}