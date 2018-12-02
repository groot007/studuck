<template>
	<div class="sign-up">
		<h1>Реєстрація</h1>
		 <v-text-field light solo
		 label="solo"
	      v-model="email"
	      placeholder="E-mail"
	      required
	    ></v-text-field>
		<v-text-field light solo
			placeholder="Пароль"
	      v-model="password"
	      required
	      class="password-field"
	    ></v-text-field>
		<v-divider></v-divider>
			<v-text-field light solo
			placeholder="Кафедра"
	      v-model="kafedra"
	    ></v-text-field>
		<v-text-field light solo
			placeholder="Група"
	      v-model="group"
	    ></v-text-field>

	   <v-switch
	      label="Я староста"
	      v-model="admin"
	    ></v-switch>

	    <v-autocomplete v-if="!admin" l
        v-model="generalSchedule"
        :items="items"
        label="Вибрати розклад"
      ></v-autocomplete>

       

      <v-text-field v-if="admin" light solo
			placeholder="Назва розкладу"
	      v-model="scheduleName"
	    ></v-text-field>

	    <v-btn light @click.prevent="onSignup">Зараєструватись</v-btn>
	    <v-btn light @click.prevent="onSigninGoogle">Google</v-btn>
		<p>повернутись до <router-link to="/login">авторизації</router-link></p>
	</div>
</template>

<script>
	import firebase from '../shared/firebase';

	export default {
		name: 'login',
		data: function() {
			return {
				email: '',
				password: '',
				kafedra: '',
				group: '',
				admin: false,
				generalSchedule: '',
				scheduleName: '',
				items: [
					"КН",
					"AV"
				]
			}
		},
		computed: {
	      comparePasswords () {
	        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
	      },
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
			signUp: function() {
				firebase.firebaseMain.auth().createUserWithEmailAndPassword(this.email, this.password).then(
					function (user) {
						alert('created');
					},
					function (err) {
						alert('Error ' + err.message)
					}
				)
			},
			onSignup () {
		        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
		      },
		      onSigninGoogle () {
		        this.$store.dispatch('signUserInGoogle')
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
		      onDismissed () {
		        this.$store.dispatch('clearError')
		      }
		    }
		}
</script>

<style lang="scss">
	.sign-up {
		width: 320px;
		padding: 0 15px;
		color: #fff;
		margin: 0 auto;

		.password-field {
			
		}
	}
</style>