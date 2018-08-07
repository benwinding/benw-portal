import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Projects from './views/Projects.vue'
import Contact from './views/Contact.vue'
import How from './views/How.vue'
import OldSite from './views/OldSite.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/but-how',
      name: 'but-how',
      component: How
    },
    {
      path: '/old-site',
      name: 'old-site',
      component: OldSite
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})
