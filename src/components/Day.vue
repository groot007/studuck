<template>
	<div class="day monday" v-bind:class="className">
	  <h2><input type="text" value="Monday" class="hidden"><span>{{ dayDataLocal.name }}</span> </h2>
    <div class="edit-icon">
       <v-icon v-if="!editMode" @click="changeEditMode(dayItem)">edit</v-icon>
       <v-icon v-if="editMode" @click="changeEditMode(dayItem, 'remove')">remove</v-icon>
       <v-icon v-if="editMode" @click="changeEditMode(dayItem, 'save')">save</v-icon>
    </div>
	  <ul>
	  	<li v-for="(item, i) in dayDataLocal.subjects">
        <div class="counter">
          <span class="count">{{ i + 1 }}.</span> <br>
          <!-- <span><v-icon>info</v-icon></span> -->
        </div>
        <div class="main">
          <div class="sub-wrap">
            <span v-if="!editMode" class="subject-title">{{ dayDataLocal[item].title }} </span> 
             <v-text-field
              v-if="editMode"
              v-model="dayDataLocal[item].title"
              placeholder="Назва предмету"
              box
            ></v-text-field>
          </div>
          <div class="teacher-wrap"  v-if="dayDataLocal[item].teacher || editMode">
            <span v-if="!editMode" class="teacher">{{ dayDataLocal[item].teacher }}</span>
            <v-text-field
              v-if="editMode"
              v-model="dayDataLocal[item].teacher"
              placeholder="Викладач"
              box
            ></v-text-field>
          </div>
        </div>
        <div class="room">
          <div class="wrap">
            <v-text-field
              v-if="editMode"
              v-model="dayDataLocal[item].room"
              placeholder="Аудиторія"
              box
            ></v-text-field>
            <span v-if="!editMode" class="place">{{ dayDataLocal[item].room }}</span>
          </div> 
        </div> 

        <v-icon v-if="editMode" @click="removeSubject(item)">remove</v-icon>       
	  	</li>
      <li v-if="editMode" @click="addSubject()">
        <v-icon>add_circle_outline</v-icon>
      </li>
	  </ul>
	  <div class="corner">
	     <div class="bg"></div>
	     <div class="light"></div>
	  </div>
	</div>
</template>

<script>
  
	export default {
		props: ['className', 'title', 'dayData', 'dayItem', 'scheduleItem', 'weekItem', 'allData'],
		data() {
			return {
        dayDataLocal: this.dayData,
        editMode: false,
				titleSub: this.$store.state.title,
				day: "Monday"
			}
		},
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
		methods: {
			clicked() {
				console.log(this.dayData);
			},
      addSubject() {
        let idx = this.dayDataLocal.subjects.length + 1;
        this.dayDataLocal.subjects.push("subj" + idx);
        this.dayDataLocal["subj" + idx] = {};
      },
      removeSubject(item) {
        let index = this.dayDataLocal.subjects.indexOf(item);
          if (index > -1) {
            this.dayDataLocal.subjects.splice(index, 1);
          }
          delete this.dayDataLocal[item];
      },
      changeEditMode(dayItem, action) {
        if (action == "remove") {
          let data = this.allData.schedules[this.scheduleItem][this.weekItem];
          let index = data.days.indexOf(dayItem);
          if (index > -1) {
            data.days.splice(index, 1);
          }
          delete data[dayItem];

          this.$store.commit("setUserSchedule", JSON.stringify(this.allData));
          this.$store.dispatch('updateData', this.user.id);

        } else if (action == "save") {
          let parseLocal = JSON.parse(JSON.stringify(this.dayDataLocal));

          this.allData.schedules[this.scheduleItem][this.weekItem][dayItem] = parseLocal ;
          this.$store.commit("setUserSchedule", JSON.stringify(this.allData));
          this.$store.dispatch('updateData', this.user.id);
        }


        this.editMode = !this.editMode;
      }
		},
		created: function () {
	    }
	}
</script>

<style lang="scss">

@import "../shared/styles/_variables";

.day {
  display: inline-block;
  vertical-align: top;
  width: 450px;
  padding: 25px;
  margin: 20px;
  min-height: 300px;
  max-height: 500px;
  background: $MondayBg;
  position: relative;
  font-family: 'Oswald', sans-serif;
  
  &.monday {
    background: $MondayBg;
    
    h2 {
      color: #ef6c00;
    }
    
    .corner .light {
      border-top-color: #fb8c00;
    }
  }
  
  &.thursday {
    background: $ThursdayBg;
    
    h2 {
      color: #689f39;
    }
    
    .corner .light {
      border-top-color: #7db343;
    }
  }

  .edit-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .corner {
    position: absolute;
    bottom: 0;
    right: 0;
    .bg {
      width: 0;
      height: 0;
      position: absolute;
      right: 15px;
      bottom: -15px;
      transform: rotate(-90deg);
      border-top: 30px solid transparent;
      border-right: 30px solid transparent;
      border-bottom: 30px solid $bg;
    }
    .light {
      width: 0;
      height: 0;
      position: absolute;
      right: 0;
      bottom: -30px;
      border-top: 30px solid;
      border-right: 30px solid transparent;
      border-bottom: 30px solid transparent;
    }
  }
  
  h2 {
    text-transform: uppercase;
    padding: 0;
    text-align: left;
    margin: 0; 
    font-size: 32px;
    font-family: 'Russo One', sans-serif;
    font-weight: bold;
    input {
      text-transform: uppercase;
      color: #ddd;
      padding: 0;
      margin: 0; 
      font-size: 32px;
      border: none;
      font-family: Arial;
      font-weight: bold;
      background: rgba(255,255,255, .1);
      &:focus {
        outline: none;
      }
    }
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    text-align: left;
    margin: 55px 0 30px 0;
    li {
      width: 100%;
      margin: 0;
      margin-bottom: 28px;
      padding: 10px;
      position: relative;
      display: flex;
      position: relative;
      background: rgba(255,255,255, .3);
      
      .counter {
        flex: 1 0 8%;
      }

      .main {
        flex: 1 0 82%;

        .teacher-wrap {
          width: 40%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: absolute;
          left: 40%;
          bottom: -20px;
          background: #ddd;
          color: #fff;
          font-size: 15px;
          padding: 5px;

          .v-text-field__details {
            display: none;
          }
        }
      }

      .room {
        flex: 1 0 10%;
        display: flex;
        align-items: center;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .day {
    width: 100%;
    margin: 0;
  }
}
</style>