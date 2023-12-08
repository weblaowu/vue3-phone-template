import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import globalComp from '@/components/Global/index.js'
import router from './router'
import 'animate.css'
import 'normalize.css/normalize.css'
import './assets/style/main.scss'
// vant toast
import 'vant/es/toast/style'

import 'virtual:svg-icons-register'

// import './promission.js'

import VConsole from 'vconsole'
;['test'].includes(import.meta.env.MODE) && new VConsole()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(globalComp)
app.mount('#app')
