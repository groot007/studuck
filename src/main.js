import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'
import router from './router'
import firebase from './shared/firebase';
import colors from 'vuetify/es5/util/colors'


Vue.use(Vuetify, {
  theme: {
    // primary: '#fff',
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
  	firebase.firebaseMain.auth().onAuthStateChanged((user) => {
  		if (user) {
  			this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('saveUserData', user.uid);
  		}
  	});
  }
})
