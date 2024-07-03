import { createRouter, createWebHistory } from 'vue-router'
import AppointmentsLayout from '@/views/appointments/AppointmentsLayout.vue'
import AuthApi from '@/api/AuthApi'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresRedirect: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-appointments',
          component: () => import('@/views/admin/AppointmentsView.vue'),
        }
      ]
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      meta: { requiresAuth: true },
      component: AppointmentsLayout,
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
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('@/views/auth/ForgotPasswordView.vue')
        },
        {
          path: 'olvide-password/:token',
          name: 'new-password',
          component: () => import('@/views/auth/NewPasswordView.vue')
        },
      ]
    }
  ]
})

router.beforeEach( async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)

  if(requiresAuth){
    try {
      const { data } = await AuthApi.auth()
      if(data.admin){
        next({name: 'admin'})
      } else {
        next()
      }
    } catch (error) {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

router.beforeEach( async (to, from, next) => {
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)

  if(requiresAdmin){

    try {
      const {data} = await AuthApi.admin()
      next()
    } catch (error) {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

router.beforeEach( async (to, from, next) => {
  const requiresRedirect = to.matched.some(url => url.meta.requiresRedirect)

  if(requiresRedirect){

    try {
      const token = localStorage.getItem('AUTH_TOKEN')
      if(!token){
        return next({name: 'login'})
      }

      const { data } = await AuthApi.auth()
      if(data.admin){
        next({name: 'admin-appointments'})
      } else {
        next({name: 'appointments'})
      }

    } catch (error) {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

export default router