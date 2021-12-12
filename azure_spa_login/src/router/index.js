import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Auth from '../views/Auth.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['user/isAuthenticated']
  const protectedNames = ['index']
  if (protectedNames.includes(to.name) && !isAuthenticated)
    return next({ name: 'auth' })
  else return next()
})

export default router
