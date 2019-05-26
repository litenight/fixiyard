import Vue from 'vue'
import Router from 'vue-router'

// Page conent
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import Profile from './views/Profile'
import EditJob from './views/EditJob'
import Home from './views/Home'
import Customers from './views/Customers'
import Settings from './views/Settings'

// Fallback page
import PageNotFound from './views/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '*',
        redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/sign-in',
      name: 'Sign In',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: SignUp
    },
    {
      path: '/jobs/add',
      name: 'New Job',
      component: EditJob
    },
    {
      path: '/jobs/:id/edit',
      name: 'Edit Job',
      component: EditJob
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
