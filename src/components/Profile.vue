<template>
	<div class="profile-wrap">
		<a href="#" @click.prevent="logout" class="logout">
                
              <v-icon>power_settings_new</v-icon><span class="logout-link" >Вийти</span></a>
		<h1 @click="getUser">Профіль</h1>
		<form>
		<div class="user-inf">
			<img :src="photoUrl" alt="">
		</div>
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

		<!-- <v-switch
		label="Я староста"
		v-model="admin"
		></v-switch> -->

		<!-- <v-autocomplete v-if="!admin" l
		v-model="generalSchedule"
		:items="items"
		label="Вибрати розклад"
		></v-autocomplete> -->

		<!-- <v-text-field v-if="admin" light solo
		placeholder="Назва розкладу"
		v-model="scheduleName"
		></v-text-field> -->

		<v-btn light @click="saveUserData">Зберегти</v-btn>
		<v-btn light @click="linkToGoogle">Google</v-btn>
		<v-btn light @click="unlinkToGoogle">unGoogle</v-btn>
		</form>
	</div>
</template>

<script>
	export default {
		name: "Profile",
		data () {
			return {
				email: this.$store.getters.user.email,
				photoUrl: this.$store.getters.user.photoUrl,
				password: '',
				kafedra: '',
				group: '',
				admin: false,
				generalSchedule: '',
				scheduleName: '',
				items: [
				"КН",
				"AV"
				],
				userEmpty: {
					photoUrl: "",
					email: ""
				}
			}
		},
		methods: {
			logout: function() {
		      this.$store.dispatch('logout');
		    },
			getUser: function () {
				console.log(this.$store.getters.user);
			},
			saveUserData: function() {
				this.$store.dispatch('saveUserData', {
					data: {
						faculty: this.faculty,
						group: this.group
					}
				})
			},
			linkToGoogle: function () {
				this.$store.dispatch('linkToGoogle');
			},
			unlinkToGoogle: function () {
				this.$store.dispatch('unLinkGoogle');
			}
		}
	}
</script>

<style lang="scss">
h2 {
	font-weight: bold;
	font-size: 30px;
}

.profile-wrap {
	width: 320px;
	position: relative;
	margin: 0 auto;
	padding: 30px 15px;
}

.logout {
	position: absolute;
    right: 0;
    top: 0;
    vertical-align: middle;
    font-size: 20px;
    color: #f00;
    text-decoration: none;
}

.user-inf {
	color: #fff;
	span {
		color: #fff;
	}
	img {
		width: 100px;
		border: 1px solid #fff;
		border-radius: 50%;
	}
}

@media screen and (max-width: 768px) {
	input {
		width: 80%;
	}
	button {
		width: 50%;
	}
}
</style>