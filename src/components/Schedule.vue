<template>
	<div>
		<h1 @click="getUsersData">Розклад</h1>
	
	    <div class="schedule-title" >
	      <div v-if="schedulesData.schedules">
	      	 <div class="schedule-item" v-for="schedule in schedulesData.schedules.list">
		      <h3>{{ schedule }} <span @click="removeSchedule">-</span></h3>
		      <div class="week" v-for="week in schedulesData.schedules[schedule].weeks" >     
			        <app-day v-for="(item, idx) in schedulesData.schedules[schedule][week].days" :key="item.id" v-bind:className="classes[idx]" v-bind:title="'Monday'" v-bind:dayData="schedulesData.schedules[schedule][week][item]" v-bind:dayItem="item" v-bind:scheduleItem="schedule" v-bind:weekItem="week" :allData="schedulesData" :teachers="teachers"></app-day>
			        <div class="add-day" @click="addDay(schedule, week)">ADD DAY</div>
			      </div>
			    </div>
	      </div>
	    </div>
	    <div class="precache">
	    	<ul>
	    		<li v-for="item in teachers">
	    			<img :src="item.photo_url">
	    		</li>
	    	</ul>
	    </div>
	  </div>
  </div>
</template>

<script>
import Day from "./Day.vue"
import firebase from '../shared/firebase';


export default {
	name: "Schedule",
	data () {
	    return {
	      titleSub: "",
	      scheduleTitle: "",
	      days: [],
	      notif: 'TEXT',
	      weeks: [],
	      dayName: 'Назва',
	      message: '',
	      week: "",
	      teachers: {},
	      msg: 'Welcome to Your Vue.js App',
	      classes: [
	        "monday", "thursday", "wednesday", "tuesday", "friday"
	      ]
	    }
	  },

	  computed: {
		  user () {
		    return this.$store.getters.user
		  },

		  schedulesData () {
		  	let data = this.$store.getters.userSchedule;
		  	let that = this;
	  // 		if (data && !data.admin) {
			// 	firebase.db.collection("notification").doc(data.group).onSnapshot(function(rez) {
			//         that.notif = rez.data().message;
			//     });
			// }
			if (data) {
				firebase.db.collection("teachers").doc('all').get().then( rez => {
					this.teachers = rez.data();
				})
			}
		  	return data || []
		  }
		},

	  methods: {
	  	sendMessage: function () {
	  		let payload = {
	  			group: this.schedulesData.group,
	  			json: {message: this.message}
	  		}
	  		this.$store.dispatch('sendMessage', payload);
	  	},
    	getUsersData: function() {
    		console.log(this.schedules);
    		console.log(this.$store.getters.userSchedule)
    	},

    	addDay(schedule, week) {
    		let mod = this.schedulesData.schedules[schedule][week];
    		const daysL = mod.days.length;
    		if (daysL > 5) return;
    		mod.days.push("day" + (daysL + 1));
    		mod["name"] = this.dayName;
    		mod["day" + (daysL + 1)] = {subjects: []};
    		this.$store.commit("setUserSchedule", JSON.stringify(this.schedulesData));
    	},

	  removeSchedule () {
	  	console.log(11)
	  }
    },

	  components: {
	    AppDay: Day
	  },

	  mounted: function () {
	  	
    }
}
</script>

<style lang="scss">
	.week {
		padding:  0 15px; 
	}

	.precache {
		display: none;
	}
</style>