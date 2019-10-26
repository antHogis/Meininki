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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
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
