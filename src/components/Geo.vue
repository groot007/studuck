<template>
	<div class="notification">
		<h1>Time resque</h1>
		<div class="getCoord" @click="getCoord">GEET</div>
		<div class="user-coords">
			<h3>Ваші кординати: </h3>
			{{ userCoords }}
		</div>
	</div>
</template>

<script>
	import firebase from '../shared/firebase';

	export default {
		name: 'Google',
		data: function() {
			return {
				email: '',
				password: '',
				userCoords: '',
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
			getCoord () {
				let that = this;
				if ("geolocation" in navigator) {
					navigator.geolocation.getCurrentPosition(function(position) {
					  var service = new google.maps.DistanceMatrixService;
				        service.getDistanceMatrix({
				          origins: [position.coords.latitude + ',' + position.coords.longitude],
				          destinations: ['50.4501071,30.5240501'],
				          travelMode: 'WALKING',
				          unitSystem: google.maps.UnitSystem.METRIC,
				          avoidHighways: false,
				          avoidTolls: false
				        }, function(response, status) {
				        	that.userCoords = position.coords.latitude + ',' + position.coords.longitude;
				          console.log(response);
				        });
					});
				} else {
					
				}
			}
		},
		mounted() {
			this.getCoord();
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