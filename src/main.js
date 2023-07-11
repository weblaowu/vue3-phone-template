import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import globalComponents from './middleware/globalComponent'
import 'animate.css'
import 'normalize.css/normalize.css'
import './assets/style/main.scss'
// import './promission.js'

const app = createApp(App)
globalComponents(app)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
