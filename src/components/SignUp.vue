<template>
	<div class="sign-up">
		<h1>Реєстрація</h1>
		<form>
			 <v-text-field light solo
			 label="solo"
		      v-model="email"
		      placeholder="E-mail"
		      required
		    ></v-text-field>
			<v-text-field light solo
			type="password"
				placeholder="Пароль"
		      v-model="password"
		      required
		      class="password-field"
		    ></v-text-field>
		    <v-divider></v-divider>
				<v-text-field light solo
				placeholder="Прізвище, ім'я"
		      v-model="name"
		    ></v-text-field>
			<v-divider></v-divider>
				<v-text-field light solo
				placeholder="Факультет"
		      v-model="faculty"
		    ></v-text-field>
			<v-text-field light solo
				placeholder="Група"
		      v-model="group"
		    ></v-text-field>

		   <v-switch
		      label="Я староста"
		      v-model="admin"
		      @change="getSch"
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
		 </form>

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
				faculty: '',
				group: '',
				name: '',
				admin: false,
				emptySchedule: {
					user: "",
					admin: false,
					group: "",
					faculty: "",
					schedules: {
						list :[]
					}
				},
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
			getSch (){
			    let sch = firebase.db.collection("users-schedules").where("admin", "==", true);
			    sch.get().then(rez => {
			    	console.log(rez);
			    	rez.forEach(doc => {
			    		let data = doc.data().schedules;
			    		let generals = [];
			    		console.log(data);
			    		for (var item in data) {
			    			console.log(item);
			    			if (data[item].general) {
			    				generals.push(item);
			    			}
			    		}
			    		this.items = generals;
				      console.log(generals);
				    })
			    });
			},
			onSignup () {
				let scheduleList = (this.admin) ? this.scheduleName : this.group;
				let preJson = {
					admin: this.admin,
					group: this.group,
					name: this.name,
					faculty: this.faculty,
					schedules: {
						list : [scheduleList],
						[scheduleList]: {
							weeks: ["weekTop"],
							weekTop: {
								name: "Чисельник",
								days: ["day1"],
								day1: {
									name: "Понеділок",
									subjects: []
								}
							}
						}
					}
				}
				
				let payload = {
					email: this.email, 
					password: this.password,
					json: preJson
				}
		        this.$store.dispatch('signUserUp', payload);
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