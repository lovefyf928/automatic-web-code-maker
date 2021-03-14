import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Index',
    component: () => import("../views/Index.vue")
  },
  {
    path: "/make-page",
    name: "MakePage",
    component: () => import("../views/MakePage.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
