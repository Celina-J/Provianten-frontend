import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminPageView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/404-page',
      name: '404-page',
      component: () => import('../views/404PageView.vue')
    },
    {
      path: '/search-page',
      name: 'search-page',
      component: () => import('../views/SearchPageView.vue')
    },
    {
      path: '/order-complete',
      name: 'order-complete',
      component: () => import('../views/OrderCompleteView.vue')
    },
    {
      path: '/order-page',
      name: 'order-page',
      component: () => import('../views/OrderPageView.vue')
    },
    {
      path: '/order-details',
      name: 'order-details',
      component: () => import('../views/OrderDetailsView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: () => import('../views/PageNotFoundView.vue')
    }
  ]
})


export default router;
