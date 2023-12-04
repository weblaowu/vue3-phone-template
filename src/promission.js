import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import { Session } from './utils/storage'
import { authorizeAndTrack } from './utils/wechatAuth'

NProgress.configure({
  showSpinner: false, // 是否显示加载ico
})

// 路由进入之前
router.beforeEach((to, _, next) => {
  NProgress.start()
  if (Session.get('openid') || to.path === '/promission') return next()
  const code = import.meta.env.MODE === 'production' ? to.query.code : '123'
  authorizeAndTrack(code, next)
})

router.afterEach(() => {
  NProgress.done()
})
