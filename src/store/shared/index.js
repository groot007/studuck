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
			if (!this.state.jsonData) {
				this.state.jsonData = firebase.db.collection("users-schedules").doc(user).get();
			}
			return this.state.jsonData;
		},

		updateData (state, user) {
			console.log(user, state.user);
			var json = JSON.parse(localStorage.getItem(user));
			firebase.db.collection("users-schedules").doc(user).set(json);
		},

		sendMessage ({commit}, payload) {
			firebase.db.collection("notification").doc(payload.group).set(payload.json);
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