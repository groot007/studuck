<template>
	<div class="notification">
		<h1>{{ schedulesData.group }}</h1>

		<div class="notif" v-if="schedulesData.admin">
			<v-text-field
              v-model="message"
              placeholder="Notification"
              box
            ></v-text-field>
            <v-btn light @click.prevent="sendMessage">Повідомити групу</v-btn>
		</div>
		<ul class="messages-list">
			<li v-for='item in tempHistory'>
				{{ history[item].text }}
			</li>
		</ul>
		
	</div>
</template>

<script>
	import firebase from '../shared/firebase';

	export default {
		name: 'Notification',
		data: function() {
			return {
				email: '',
				password: '',
				notif: 'TEXT',
				message: '',
				tempHistory: [],
				history: []
			}
		},
		computed: {
			schedulesData () {
			  	let data = this.$store.getters.userSchedule;
			  	let that = this;
		  		if (data) {
					firebase.db.collection("notification").doc("КН-21").onSnapshot(function(rez) {
				        that.history = rez.data();
				        that.tempHistory = rez.data().historyArr.reverse();
				        that.tempHistory = that.tempHistory.slice(0, 3)
				        console.log(that.history);
				    });
				}
			  	return data || []
		  }
	    },
		 watch: {

	    },
		methods: {
			sendMessage: function () {
				let date = new Date().getTime();
				this.history.historyArr.push('message' + date);

	  			let payload = {
		  			group: this.schedulesData.group,
		  			json: {
		  				historyArr: this.history.historyArr,
		  				['message'+ date]: {text: this.message, time: date, user: this.schedulesData.name}
		  			}
	  		}
	  		this.$store.dispatch('sendMessage', payload);
	  	},	
		}
	}
</script>

<style lang="scss">
	.notification {
		width: 320px;
		padding: 0 15px;
		margin: 0 auto;
		color: #fff;
		margin-top: 40px;
	}

	.messages-list {
		li {
			padding: 10px;
			margin: 15px 0;
			background: rgba(255,255,255, .8);
			border-radius: 10px;
			color: #000;
			text-align: left;
			font-size: 20px;
			width: 100%;
			display: inline-block;
		}
	}
</style>