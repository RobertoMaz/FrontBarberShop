import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AppointmentsLayout from '@/views/appointments/AppointmentsLayout.vue'
import AuthApi from '@/api/AuthApi'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppointmentsLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import('@/views/appointments/MyAppointmentsView.vue'),
        },
        {
          path: 'nueva',
          component: () => import('@/views/appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointments',
              component: () => import('@/views/appointments/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'appointment-details',
              component: () => import('@/views/appointments/AppointmentView.vue')
            }
          ]
        },
        {
          path: ':id/editar',
          component: () => import('@/views/appointments/EditAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointments',
              component: () => import('@/views/appointments/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'edit-appointment-details',
              component: () => import('@/views/appointments/AppointmentView.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue')
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('@/views/auth/ConfirmAccountView.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue')
        },
      ]
    }
  ]
})

router.beforeEach( async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)

  if(requiresAuth){
    try {
      await AuthApi.auth()
      next()
    } catch (error) {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

export default router
