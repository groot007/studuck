import firebase from '../../shared/firebase'
import router from '../../router'
import userData from './userData'


export default {
  state: {
    user: null,
    userSchedule: null,
    preloader: true
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserSchedule (state, payload) {
        state.userSchedule = payload;
        localStorage.setItem(state.user.id, payload);
    },
    removePreloader (state, payload) {
      state.preloader = payload
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.firebaseMain.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          function (user) {
            let userId = firebase.firebaseMain.auth().currentUser.uid
            commit('setLoading', false);
            const newUser = {
              id: userId.uid,
              name: userId.displayName,
              email: userId.email,
              photoUrl: userId.photoURL
            }
            commit('setUser', newUser);
            firebase.db.collection("users-schedules").doc(userId).set(payload.json);
            commit("setUserSchedule", JSON.stringify(payload.json));
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    setDefaultData ({commit, getters}, payload) {
      let userId = getters.user;
      console.log(userId);
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.firebaseMain.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInGoogle ({commit, getters, dispatch}) {
      commit('setLoading', true)
      commit('clearError')
      const provider = new firebase.base.auth.GoogleAuthProvider();
      firebase.firebaseMain.auth().signInWithPopup(provider)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            console.log("auth");
            commit('setUser', newUser);
            // dispatch('saveUserData');
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    linkToGoogle ({commit}) {
      var provider = new firebase.base.auth.GoogleAuthProvider();
      firebase.firebaseMain.auth().currentUser.linkWithPopup(provider).then(function(result) {
          // Accounts successfully linked.
          var credential = result.credential;
          var user = result.user;
          const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser);
          console.log('linked', credential, user)
        }).catch(function(error) {
          console.log(error);
          // Handle Errors here.
          // ...
        });
    },
    unLinkGoogle () {
      var user = firebase.firebaseMain.auth().currentUser;

      firebase.firebaseMain.auth().currentUser.unlink("google.com").then(function() {
        // Auth provider unlinked from account
        console.log("unlink")
      }).catch(function(error) {
        // An error happened
        console.log(error)
      });
    },
    signUserInFacebook ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.firebaseMain.auth().signInWithPopup(new firebase.firebaseMain.auth.FacebookAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInGithub ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.firebaseMain.auth().signInWithPopup(new firebase.firebaseMain.auth.GithubAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInTwitter ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.firebaseMain.auth().signInWithPopup(new firebase.firebaseMain.auth.TwitterAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      });
      router.replace('/')
      commit('removePreloader', false);
    },
    resetPasswordWithEmail ({ commit }, payload) {
      const { email } = payload
      commit('setLoading', true)
      firebase.firebaseMain.auth().sendPasswordResetEmail(email)
      .then(
        () => {
          commit('setLoading', false)
          console.log('Email Sent')
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    logout ({commit}) {
      firebase.firebaseMain.auth().signOut()
      commit('setUser', null)
      router.replace('login')
    },
    saveNewUser({commit, state, getters}, payload) {
      
    },

    saveUserData({commit, state, getters}, userId) {
      firebase.db.collection("users-schedules").doc(userId).get().then( rez => {
        commit('setUserSchedule', JSON.stringify(rez.data()));
      })
    }
  },

  getters: {
    user (state) {
      return state.user
    },
    userSchedule (state) {
      if (navigator.onLine) {
        return JSON.parse(state.userSchedule)
      } else {
        return JSON.parse(localStorage.getItem(state.user.id))
      }
    },
    preloader (state) {
      return state.preloader
    }
  }
}