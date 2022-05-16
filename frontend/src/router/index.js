import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/template/Home'
import Categoria from '@/components/categoria/Categoria'
import Login from '@/components/auth/Authentication'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/categoria',
    component: Categoria,
    name: 'Categoria'
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login')
    next()
    
  const userJson = localStorage.getItem('__minhastarefas_user')
  userJson ? next() : next({ name: 'Login' })
})

export default router
