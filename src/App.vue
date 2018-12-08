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
              <router-link to="/"><v-icon>home</v-icon> <span>Головна</span></router-link>
            </li>
            <li>
              <router-link to="/notification"><v-icon>notifications</v-icon> <span>Сповіщення</span></router-link>
            </li>
            <li>
              <router-link to="/geo"><v-icon>location_on</v-icon> <span>Google</span></router-link>
            </li>
            <li v-if="!isLogged">
              <router-link to="/Login"><v-icon>account_circle</v-icon> <span>Увійти</span></router-link>
            </li>
            <li class="profile-link" v-if="isLogged">
              <router-link to="/profile"><v-icon>account_circle</v-icon><span>Профіль</span></router-link> 
            </li>
            <li v-if="isLogged">
              <router-link to="/schedule"><v-icon>schedule</v-icon> <span>Розклад</span></router-link></li>
            <li v-if="isLogged">
              </li>
          </ul>
        </nav>
      </div>
    </div>
    <router-view></router-view> 
    <div class="mmenu">
      <div>
        <router-link class="mmenu_item" to="/">
          <span></span>
          <v-icon>home</v-icon>
        </router-link>
      </div>
      <div>
        <router-link class="mmenu_item" to="/notification">
          <span></span>
          <v-icon>notifications</v-icon>
        </router-link>
      </div>
      <div>
        <router-link class="mmenu_item" to="/geo">
          <span></span>
          <v-icon>location_on</v-icon>
        </router-link>
      </div>
      <div>
        <router-link class="mmenu_item" to="/schedule">
          <span></span>
          <v-icon>schedule</v-icon>
        </router-link>
      </div>
      <div v-if="!isLogged">
        <router-link to="/login">
          <span></span>
          <v-icon>account_circle</v-icon>
        </router-link>
      </div>
      <div v-if="isLogged">
        <router-link class="mmenu_item" to="/profile">
          <span></span>
          <v-icon>account_circle</v-icon>
        </router-link>
      </div>
    </div>
  </div>
</v-app>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      bottomNav: 'recent',
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
.mmenu {
  display: none;
}

.theme--dark.application {
  background: $bg;
}

.v-item-group.v-bottom-nav{
  display: none;
 
}

img {
  max-width: 100%;
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
  
  .mmenu {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    align-items: center;
    justify-content: space-around;
    background-color: #252a20;

    box-shadow: 0 0 5px #252a1f;
    & > div {
      width: 20%;
      height: 100%;
    }
  }

  .mmenu_item {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    padding: 6px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .v-icon {
          border-bottom: 2px solid transparent;
    }
    &.router-link-exact-active {
      
      
      text-decoration: none;
      .v-icon {
          padding: 0 0 5px 0;
          border-bottom: 2px solid #9acf00;
      }
    }
  }

  #app {
    padding-top: 10px;
    padding-bottom: 56px;
  }

  .panel-top {
    display: none;
  }
}
</style>
