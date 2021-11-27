import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {auth} from '../_utils/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const protectedNames = ['About', 'Home']
  const isAuthenticated = await auth()
  console.log("is auth?", isAuthenticated)
  if (protectedNames.includes(to.name) && !isAuthenticated) await auth()
  else next()
})

export default router
