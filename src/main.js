import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.js'
import { useToast } from 'vue-toast-notification'
import "vue-toast-notification/dist/theme-bootstrap.css"

import App from './App.vue'
import router from './router'

const $toast = useToast({
    duration: 8000,
    position: 'top-right'
})



const app = createApp(App)

app.provide('toast', $toast)
app.use(createPinia())
app.use(plugin, defaultConfig(config))
app.use(router)

app.mount('#app')
