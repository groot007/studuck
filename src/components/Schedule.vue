<template>
	<div>
		<div class="notification" v-if="!schedulesData.admin">
			{{ this.notif }}
		</div>
		<div class="notif" v-if="schedulesData.admin">
			<v-text-field
              v-model="message"
              placeholder="Notification"
              box
            ></v-text-field>
            <v-btn light @click.prevent="sendMessage">Send</v-btn>
		</div>
		<h2 @click="getUsersData">Schedule</h2>
	
	    <div class="schedule-title" >
	      <div v-if="schedulesData.schedules">
	      	 <div class="schedule-item" v-for="schedule in schedulesData.schedules.list">
		      <h2>{{ schedule }} <span @click="removeSchedule">remove</span></h2>
		      <div class="week" v-for="week in schedulesData.schedules[schedule].weeks" >     
			        <app-day v-for="(item, idx) in schedulesData.schedules[schedule][week].days" :key="item.id" v-bind:className="classes[idx]" v-bind:title="'Monday'" v-bind:dayData="schedulesData.schedules[schedule][week][item]" v-bind:dayItem="item" v-bind:scheduleItem="schedule" v-bind:weekItem="week" :allData="schedulesData"></app-day>
			        <div class="add-day" @click="addDay(schedule, week)">ADD DAY</div>
			      </div>
			    </div>
	      </div>
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
	      message: '',
	      week: "",
	      msg: 'Welcome to Your Vue.js App',
	      classes: [
	        "monday", "thursday", "wednesday"
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
	  		if (data && !data.admin) {
				firebase.db.collection("notification").doc(data.group).onSnapshot(function(doc) {
			        that.notif = doc.data().message;
			        console.log(this.notif, doc.data(), doc.data().message);
			    });
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
</style>