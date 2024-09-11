import { createRouter, createWebHistory } from 'vue-router'
import ModelView from '../views/ModelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '3d-model',
      component: ModelView
    },
  ]
})

export default router
