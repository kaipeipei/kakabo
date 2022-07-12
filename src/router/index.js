import { createRouter, createWebHashHistory } from 'vue-router'
import messageHandle from '../views/messageHandle.vue'
const routes = [
  {
    path: '/',
    component: messageHandle
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
