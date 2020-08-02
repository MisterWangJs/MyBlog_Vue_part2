import Vue from 'vue'
import Router from 'vue-router'
//需要下载vue-resource   使用命令cnpm install vue-resource
import VueResource from 'vue-resource'
import Login from '@/components/login/Login'
import Blog from '@/components/main/Blog'
import AddBlog from '@/components/main/AddBlog'
import UpdateBlog from '@/components/main/UpdateBlog'
import UpdatePassword from '@/components/password/UpdatePassword'
import EnterBlog from '@/components/main/EnterBlog'
import AboutBlog from '@/components/main/AboutBlog'
import MyFeeling from '@/components/main/MyFeeling'
import UpdateFeeling from '@/components/main/UpdateFeeling'
Vue.use(Router)
Vue.use(VueResource);
//设置路由


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/AddBlog',
      name: 'AddBlog',
      component: AddBlog
    },
    {
      path: '/UpdateBlog',
      name: 'UpdateBlog',
      component: UpdateBlog
    },
    {
      path: '/UpdatePassword',
      name: 'UpdatePassword',
      component: UpdatePassword
    },
    {
      path: '/EnterBlog',
      name: 'EnterBlog',
      component: EnterBlog
    },
    {
      path: '/AboutBlog',
      name: 'AboutBlog',
      component: AboutBlog
    },
    {
      path: '/MyFeeling',
      name: 'MyFeeling',
      component: MyFeeling
    },
    {
      path: '/UpdateFeeling',
      name: 'UpdateFeeling',
      component: UpdateFeeling
    }

  ]
})

