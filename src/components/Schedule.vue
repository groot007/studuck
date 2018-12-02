<template>
	<div>
		<h2 @click="getUsersData">Schedule</h2>
	
	    <div class="schedule-title" >
	      <span>{{ schedulesData.group }}</span>
	      <div v-if="schedulesData.schedules">
	      	 <div class="schedule-item" v-for="schedule in schedulesData.schedules.list">
		      <h2>{{ schedule }}</h2>
		      <div class="week" v-for="week in schedulesData.schedules[schedule].weeks" >     
			        <h3 v-if="schedulesData.schedules[schedule][week].days">{{ week }}</h3>
			        <app-day v-for="(item, idx) in schedulesData.schedules[schedule][week].days" :key="item.id" v-bind:className="classes[idx]" v-bind:title="'Monday'" v-bind:dayData="schedulesData.schedules[schedule][week][item]"></app-day>  
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
	      weeks: [],
	      week: "",
	      msg: 'Welcome to Your Vue.js App',
	      classes: [
	        "monday", "thursday"
	      ]
	    }
	  },

	  computed: {
		  user () {
		    return this.$store.getters.user
		  },

		  schedulesData () {
		  	return this.$store.getters.userSchedule || []
		  }
		},

	  methods: {
    	getUsersData: function() {
    		console.log(this.schedules);
    		console.log(this.$store.getters.userSchedule)
    	}
    },

	  components: {
	    AppDay: Day
	  },

	  created: function () {

    }
}
</script>

<style lang="scss">
	.week {
		padding:  0 15px; 
	}
</style>