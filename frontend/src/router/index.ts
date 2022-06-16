import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RestApi from "@/libs/rest-api";
import store from "@/store";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '../views/MainView.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        const res = (await RestApi.get<{username: string}>('/auth/validation')).data;
        store.commit("setUsername", res.username);
        next();
      } catch {
        next({name: 'login'});
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
