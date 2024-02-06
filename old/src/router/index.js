import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import TalepOlustur from '../components/TalepOlustur.vue'
import Program from '../components/DersProgram.vue'
import AnaSayfa from '../views/AnaSayfa.vue'
import Ayarlar from '../views/Ayarlar.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/talep_olusturma',
    name: 'TalepOlustur',
    component: TalepOlustur
  },
  {
    path: '/program',
    name: ' Program',
    component: Program
  },
  {
    path: '/anasayfa',
    name: 'AnaSayfa',
    component: AnaSayfa
  },
  {
    path: '/ayarlar',
    name: 'Ayarlar',
    component: Ayarlar
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
