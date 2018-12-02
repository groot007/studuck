<template>
	<div class="login">
		<h1>Вхід</h1>
		 <v-text-field light solo
	      v-model="email"
	      placeholder="E-mail"
	      required
	    ></v-text-field>
		<v-text-field light solo
			placeholder="Пароль"
	      v-model="password"
	      required
	    ></v-text-field>
	    <v-btn light @click.prevent="onSignin">Увійти</v-btn>
	    <v-btn light @click.prevent="onSigninGoogle">Google</v-btn>
		<p>У Вас ще немає акаунта? <router-link to="/signup"> Створити </router-link></p>
	</div>
</template>

<script>
	import firebase from '../shared/firebase';

	export default {
		name: 'login',
		data: function() {
			return {
				email: '',
				password: ''
			}
		},
		computed: {
	      user () {
	        return this.$store.getters.user
	      },
	      error () {
	        return this.$store.getters.error
	      },
	      loading () {
	        return this.$store.getters.loading
	      }
	    },
		 watch: {
	      user (value) {
	        if (value !== null && value !== undefined) {
	          this.$router.push('/schedule')
	        }
	      }
	    },
		methods: {
			signIn: function() {
				firebase.firebaseMain.auth().signInWithEmailAndPassword(this.email, this.password).then(
					(user) => {
						this.$router.replace('schedule');
					},
					(err) => {
						alert('Error ' + err.message)
					}
				)
			},
		  onSignin () {
	        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
	      },
	      onSigninGoogle () {
	        this.$store.dispatch('signUserInGoogle');
	      },
	      onSigninFacebook () {
	        this.$store.dispatch('signUserInFacebook')
	      },
	      onSigninGithub () {
	        this.$store.dispatch('signUserInGithub')
	      },
	      onSigninTwitter () {
	        this.$store.dispatch('signUserInTwitter')
	      },
	      onResetPassword () {
	        if (this.email === '') {
	          return this.$store.dispatch('setError', {message: 'Email can not be blnak'})
	        }
	        this.$store.dispatch('resetPasswordWithEmail', {email: this.email})
	      },
	      onDismissed () {
	        this.$store.dispatch('clearError')
	      }
		}
	}
</script>

<style lang="scss">
	.login {
		width: 320px;
		padding: 0 15px;
		margin: 0 auto;
		color: #fff;
		margin-top: 40px;
	}
</style>