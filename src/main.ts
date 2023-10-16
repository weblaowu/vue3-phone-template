import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'animate.css'
import 'vant/es/toast/style'
import 'normalize.css/normalize.css'
import './assets/style/main.scss'
import globalComp from '@/components/Global'
// import './promission.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(globalComp)
app.mount('#app')
