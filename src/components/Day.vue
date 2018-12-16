<template>
	<div class="day monday" v-bind:class="{[className]: true, 'edit-mode': editMode}" >
    <div class="wrap-schedule-main" v-if="showDay">
      <form>
  	  <h2><input type="text" value="Monday" class="hidden">
        <span v-if="!editMode">{{ dayDataLocal.name }}</span> 
         <v-text-field
                v-if="editMode"
                v-model="dayDataLocal.name"
                placeholder="Назва дня"
                box
                require
              ></v-text-field>
      </h2>
      <div class="edit-icon">
         <v-icon v-if="!editMode" @click="changeEditMode(dayItem)">edit</v-icon>
         <v-icon v-if="editMode" @click="changeEditMode(dayItem, 'remove')">clear</v-icon>
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
              <span v-if="!editMode" @click="showTeacher(dayDataLocal[item].teacher)" class="teacher">{{ dayDataLocal[item].teacher }}</span>
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
          <div class="edit-info">
            <v-icon v-if="editMode" @click="removeSubject(item, 'clear')">block</v-icon>       
          <v-icon v-if="editMode" @click="removeSubject(item, 'remove')">remove</v-icon>       
          <v-icon v-if="!editMode" @click="showMarks(item)">info</v-icon>
            
          </div>
                 
  	  	</li>
        <li v-if="editMode" @click="addSubject()">
          <v-icon>add_circle_outline</v-icon>
        </li>
  	  </ul>
  	  <div class="corner">
  	     <div class="bg"></div>
  	     <div class="light"></div>
  	  </div>

      </form>
    </div>
    <div class="teacher-details" v-if="showTeacherBlock">
      <img :src="teacher.photo_url">
      
      <div>
        <span>{{teacher.surname}}</span> <span> {{teacher.name}}</span> <span> {{teacher.fatherName}}</span>
      </div>
      <div>
        Facebook: <a :href=teacher.social>Перейти</a> 
      </div>
      <div><a href="#" class="goback" @click.prevent="showTeacher">Назад</a></div>
    </div>
    <div class="marks-block" v-if="showMarksBlock">
      <h2>Оцінки {{ marksSubject }}</h2>
      <div>
        <form>
        <div class="module-1">
             <v-data-iterator
                :items="items"
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                content-tag="v-layout"
                row
                wrap
                light
                hide-actions
              >
                <v-flex
                  slot="item"
                  slot-scope="props"
                  xs12
                  sm12
                  md12
                  lg12
                >
                  <v-card>
                    <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content>Здано :</v-list-tile-content>
                        <v-list-tile-content class="align-end">
                          <v-icon @click.prevent="props.item.lab++">add_circle_outline</v-icon>  
                          <v-icon @click.prevent="props.item.lab--">remove</v-icon>  
                          <span>{{ props.item.lab }}</span>
                          <span>/</span>
                          <span>8</span>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Поточка:</v-list-tile-content>
                        <v-list-tile-content class="align-end">
                          <v-icon @click.prevent="props.item.regular++">add_circle_outline</v-icon>  
                          <v-icon @click.prevent="props.item.regular--">remove</v-icon> 
                          <span>{{ props.item.regular }}</span>
                          <span>/</span>
                          <span>20</span>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Модуль:</v-list-tile-content>
                        <v-list-tile-content class="align-end">
                          <v-text-field
                            v-model="props.item.test"
                            placeholder="Модуль"
                            box
                          ></v-text-field>
                          
                          <span>{{ props.item.test }}</span>
                          <span>/</span>
                          <span>30</span>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card>
                </v-flex>
              </v-data-iterator>
        </div>
        </form>
        <a href="#"  style="color: #fff;" @click.prevent="showMarks">Назад</a>
      </div>
    </div>
	</div>
</template>

<script>
  import firebase from '../shared/firebase';

	export default {
		props: ['className', 'title', 'teachers', 'dayData', 'dayItem', 'scheduleItem', 'weekItem', 'allData'],
		data() {
			return {
        dayDataLocal: this.dayData,
        editMode: false,
				titleSub: this.$store.state.title,
				day: "Monday",
        photo_url: '',
        teacher: {},
        showTeacherBlock: false,
        showMarksBlock: false,
        showDay: true,
        activeSubj: 'subj1',
        marksSubject: '',
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 4
        },
        items0: {
            value: false,
            id: 'mod1',
            name: 'Модуль 1',
            lab: 0,
            regular: 0,
            test: 0,
        },
        items1: {
            value: false,
            id: 'mod2',
            name: 'Модуль 2',
            lab: 0,
            regular: 0,
            test: 0,
        },
        items: [this.items0, this.items1]
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
        this.dayDataLocal["subj" + idx] = {marks: [this.items0, this.items1]};
      },
      removeSubject(item, action) {
        if (action == 'clear') {
          this.dayDataLocal[item].title = '';
          this.dayDataLocal[item].teacher = '';
          this.dayDataLocal[item].room = '';
          this.dayDataLocal[item].marks = this.items;
        } else {
          let index = this.dayDataLocal.subjects.indexOf(item);
          if (index > -1) {
            this.dayDataLocal.subjects.splice(index, 1);
          }
          // delete this.dayDataLocal[item]; 
        }

      },
      showMarks(item) {
        if (this.showDay) {
          let marks = this.dayData[item].marks;
          console.log(marks);
          this.activeSubj = item;
          this.items[0] = (marks && marks[0]) ? marks[0] : this.items0;
          this.items[1] = (marks && marks[1]) ? marks[1] : this.items1;
          this.marksSubject = this.dayData[item].title;
          this.showMarksBlock = true;
          this.showDay = false;
        } else {
          this.showMarksBlock = false;
          this.showDay = true;
          this.dayData[this.activeSubj].marks = [this.items[0], this.items[1]];
          let parseLocal = JSON.parse(JSON.stringify(this.dayData));
          this.allData.schedules[this.scheduleItem][this.weekItem][this.dayItem] = parseLocal ;
          this.$store.commit("setUserSchedule", JSON.stringify(this.allData));
          this.$store.dispatch('updateData', this.user.id);
        }
      },
      showTeacher(surname) {
        if (this.showDay) {
          let surnameT = surname.split(' ')[0];
          this.showTeacherBlock = true;
          this.showDay = false;
          for (var item in this.teachers) {
            console.log(this.teachers);
            if (this.teachers[item].surname == surnameT) {
              this.teacher.photo_url = this.teachers[item].photo_url;
              this.teacher.surname = this.teachers[item].surname;
              this.teacher.name = this.teachers[item].name;
              this.teacher.fatherName = this.teachers[item].fatherName;
              this.teacher.details = this.teachers[item].details;
              this.teacher.social = this.teachers[item].social;
            }
          }
        } else {
          this.showTeacherBlock = false;
          this.showDay = true;  
        }

      },
      changeEditMode(dayItem, action) {
        if (action == "remove") {
          let data = this.allData.schedules[this.scheduleItem][this.weekItem];
          let index = data.days.indexOf(this.dayItem);
          if (index > -1) {
            data.days.splice(index, 1);
          }
          // delete data[this.dayItem];
        } else if (action == "save") {
          let parseLocal = JSON.parse(JSON.stringify(this.dayDataLocal));
          this.allData.schedules[this.scheduleItem][this.weekItem][this.dayItem] = parseLocal ;  
        }

        this.$store.commit("setUserSchedule", JSON.stringify(this.allData));
        this.$store.dispatch('updateData', this.user.id);


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

  &.wednesday {
    background: $WednesdayBg;
  }

  &.tuesday {
    background: $TuesdayBg;
  }

  &.friday {
    background: $FridayBg;
  }

  &.edit-mode {
    ul li {
      .main {
        flex: 1 0 65%;
        margin-right: 2%;
      }

      .room {
        flex: 1 0 20%;
      }
    }
  }

  .v-text-field--box input, .v-text-field--outline input {
    margin-top: 0;
  }

  .v-text-field--box .v-input__slot, .v-text-field--outline .v-input__slot {
    min-height: inherit;
  }

  .v-list__tile__content:last-child {
    flex-direction: row;
    .v-text-field__details {
      display: none;
    }
  }

  .edit-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .edit-info {
    position: absolute;
    right: -23px;
    display: flex;
    flex-direction: column;

    .v-icon {
      margin-bottom: 5px;
    }
  }

  .teacher-details {
    img {
      background: #ddd;
      min-height: 210px;
      width: 210px;
      display: block;
      margin: 0 auto 15px auto;
      border-radius: 50%;
      border: 8px solid #fff;
    }

    .goback, a {
      color: #fff;
    }
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
    width: 80%;
    font-size: 24px;
    font-family: 'Russo One', sans-serif;
    font-weight: bold;
    input {
      text-transform: uppercase;
      color: #ddd;
      padding: 0;
      margin: 0; 
      font-size: 24px;
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
    margin: 20px 0 20px 0;
    li {
      width: 100%;
      margin: 0;
      margin-bottom: 28px;
      padding: 10px;
      font-size: 16px;
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
          border: 1px solid #fff;
          bottom: -17px;
          background: #fabe5c;
          color: #fff;
          font-size: 15px;
          padding: 0px 5px;

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
    margin: 15px 0;
    padding: 10px 25px 10px 10px;
  }
}
</style>