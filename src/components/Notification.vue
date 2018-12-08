<template>
	<div class="notification">
		<span>{{ schedulesData.group }}</span>
		<p>{{ notif }}</p>
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
			}
		},
		computed: {
			schedulesData () {
			  	let data = this.$store.getters.userSchedule;
			  	let that = this;
		  		if (data && !data.admin) {
					firebase.db.collection("notification").doc('KN-61').onSnapshot(function(rez) {
				        that.notif = rez.data().message;
				    });
				}
			  	return data || []
		  }	
	    },
		 watch: {

	    },
		methods: {

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
</style>