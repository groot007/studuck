import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Schedule from '../components/Schedule'
import Profile from '../components/Profile'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Notif from '../components/Notification';
import Geo from '../components/Geo';
import firebase from '../shared/firebase';
import AuthGuard from './auth-guard';


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/notification',
      name: 'Notif',
      component: Notif,
      beforeEnter: AuthGuard
    },
    {
      path: '/geo',
      name: 'Geo',
      component: Geo,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
});


export default router