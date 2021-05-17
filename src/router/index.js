import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login'
import Home from '../components/Home'
import Show from '../components/user/Show'
import Users from '../components/user/Users'
import Security from '../components/user/Security'
import sendArticle from '../components/Article/sendArticle'
import ArticleAdmin from '../components/Article/ArticleAdmin'
import ReArticle from '../components/Article/ReArticle'
import coreBuy from '../components/CoreBuy/coreBuy'
import Mid from '../components/DataFrom/Mid'
import Ati from '../components/DataFrom/Ati'
import Sti from '../components/Statistics/Sti'
import Details from '../components/Statistics/Details'
import UserAdmin from '../components/Admin/UserAdmin'
import DataInfo from '../components/Admin/DataInfo'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  {
    path: '/home',
    component: Home,
    redirect: 'show',
    children: [
      { path: '/show', component: Show },
      { path: '/modUser', component: Users },
      { path: '/security', component: Security },
      { path: '/sendArticle', component: sendArticle },
      { path: '/articleAdmin', component: ArticleAdmin },
      { path: '/reArticle', component: ReArticle },
      { path: '/coreBuy', component: coreBuy },
      { path: '/mid', component: Mid },
      { path: '/ati', component: Ati },
      { path: '/details', component: Details },
      { path: '/userAdmin', component: UserAdmin },
      { path: '/dataInfo', component: DataInfo },
      { path: '/sti', component: Sti }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
