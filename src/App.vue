<template>
  <v-app dark>
  <div id="app">
    <!-- <div class="preloader" v-bind:class="{ active: preloader }"></div> -->
    <div class="panel-top">
      <div class="logo">
        <img src="./assets/logo.png">
        <span><router-link to="/Home">StuDuck</router-link></span>
      </div>
      <div class="addition-links">

       <nav>
          <ul class="menu">
            <li>
              <router-link to="/Home"><v-icon>home</v-icon> <span>Головна</span></router-link>
            </li>
            <li>
              <a href="#"><v-icon>location_on</v-icon> Google</a>
            </li>
            <li v-if="!isLogged">
              <router-link to="/Login"><v-icon>account_circle</v-icon> <span>Увійти</span></router-link></li>
            <li class="profile-link" v-if="isLogged">
              <router-link to="/profile"><v-icon>account_circle</v-icon><span>Профіль</span></router-link> 
            </li>
            <li v-if="isLogged">
              <router-link to="/schedule"><v-icon>schedule</v-icon> <span>Розклад</span></router-link></li>
            <li><span class="logout-link" @click="logout">Вийти</span></li>
          </ul>
        </nav>
      </div>
    </div>
    <router-view></router-view> 
  </div>
</v-app>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      titleSub: ""
    }
  },

  methods: {
    logout: function() {
      this.$store.dispatch('logout');
    }
  },
  computed: {
      isLogged () {
        return this.$store.getters.user
      },
      preloader () {
        return this.$store.getters.preloader
      }
    }
}
</script>

<style lang="scss">

// @import "./shared/styles/reset";
@import "./shared/styles/_variables";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

.theme--dark.application {
  background: $bg;
}

body {
  background: $bg;
  color: #fff;
  font-family: 'Russo One', sans-serif;
}

* {
  box-sizing: border-box;
}

.preloader {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  background: #000;
  transition: all .4s;
  &.active {
    pointer-events: auto;
    opacity: 1;
  }
}

.hidden {
  display: none;
}

.schedule-title{
  color: #fff;
  font-size: 24px;
}

.profile-link {

}

.addition-links {
  .logout-link {
    color: #f00;
    cursor: pointer;
  }
}

.menu {
  .v-icon {
    vertical-align: middle;
  }
  a {
    vertical-align: middle;
    text-decoration: none;
  }
}


.panel-top {
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  background: #18272d;
  display: flex;
  align-items: center;
  color: #fff;
  justify-content: space-between;
  padding: 10px 0;
  box-shadow: 0 1px 6px rgba(0,0,0, .4);

  .logo {
    img {
      max-width: 30px;
      display: inline-block;
      vertical-align: middle;
    }
    a {
      text-decoration: none;
      color: #fff;
    }
    span {
      font-size: 24px;
      font-weight: bold;
      display: inline-block;
      vertical-align: middle;
    }
    margin: 30px;
  }

  h3 {
    padding: 0;
    color: #fff;
  }
}

h1 {
  font-size: 30px;
  margin: 15px 0;
}

h1, h2, h3 {
  font-weight: normal;
  color: #fff;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

body a {
  color: #9acf00;
}

.theme--dark.v-divider {
  border-color: #fff;
  margin: 10px;
}


@media screen and (max-width: 768px) {
  .menu {
    span {
      display: none;
    }
  }

  .panel-top .logo {
    span {
      display: none;
    }
  }
}
</style>
