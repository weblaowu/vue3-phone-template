import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import globalComp from '@/components/Global'
import router from './router'
import 'animate.css'
import 'normalize.css/normalize.css'
import './assets/style/main.scss'
// vant toast
import 'vant/es/toast/style'
// import './promission.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(globalComp)
app.mount('#app')
