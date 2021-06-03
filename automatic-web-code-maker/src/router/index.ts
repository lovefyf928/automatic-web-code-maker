import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/index',
    name: 'Index',
    component: () => import("../views/Index.vue")
  },
  {
    path: "/make-page",
    name: "MakePage",
    component: () => import("../views/MakePage.vue")
  },
  {
    path: "/",
    name: "CoreConfig",
    component: () => import("../views/ddd/CoreConfig.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
