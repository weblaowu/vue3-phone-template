import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'animate.css'
import 'normalize.css/normalize.css'
import './assets/style/main.scss'
import './promission.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

// 将所有标签前缀为 `ion-` 的标签视为自定义元素
// app.config.compilerOptions.isCustomElement = (tag) => {
// 	console.log('tag: ', tag)
// 	return tag.includes('wx-open-launch-weapp')
// }
