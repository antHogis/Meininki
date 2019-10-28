import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/event/:id(.{24})',
      name: 'eventById',
      component: () => import('./views/EventViewer.vue'),
      props: true
    },
    {
      path: '/event/submit',
      name: 'submitEvent',
      component: () => import('./views/EventSubmitter.vue')
    },
    {
      path: '/signup',
      name: 'signUp',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '/login',
      name: 'logIn',
      component: () => import('./views/LogIn.vue')
    },
    {
      path: '/profile/:id(.{24})',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
      props: true
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }  
})
