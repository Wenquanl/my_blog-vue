import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/views/homeIndex'
import LoginIndex from '@/views/loginindex'
import Edit from '@/views/edit'
import mineIndex from '@/views/mineindex'
import adminIndex from '@/views/adminindex'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: (resolve) => require(['@/views/home'], resolve)
    },
    {
      path: '/admin',
      component: adminIndex,
      children: [
        {
          path: '/admin',
          name: 'admin',
          component: (resolve) => require(['@/views/admin'], resolve)
        }, {
          path: '/manageuser',
          name: 'manageuser',
          component: (resolve) => require(['@/views/manageuser'], resolve)
        }, {
          path: '/manageblog',
          name: 'manageblog',
          component: (resolve) => require(['@/views/manageblog'], resolve)
        }, {
          path: '/managecomment',
          name: 'managecomment',
          component: (resolve) => require(['@/views/managecomment'], resolve)
        },
        {
          path: '/managesort',
          name: 'managesort',
          component: (resolve) => require(['@/views/managesort'], resolve)
        }

      ]
    },
    {
      path: '/mine',
      component: mineIndex,
      children: [
        {
          path: '/mine',
          name: 'mine',
          component: (resolve) => require(['@/views/mine'], resolve)
        },
        {
          path: '/myblog',
          name: 'myblog',
          component: (resolve) => require(['@/views/myblog'], resolve)
        },
        {
          path: '/mycomment',
          name: 'mycomment',
          component: (resolve) => require(['@/views/mycomment'], resolve)
        },
        {
          path: '/updatepwd',
          name: 'updatepwd',
          component: (resolve) => require(['@/views/updatepwd'], resolve)
        }
      ]
    },
    {
      path: '/edit',
      component: Edit,
      children: [
        {
          path: '/edit',
          name: 'edit',
          component: (resolve) => require(['@/views/edit'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: LoginIndex,
      children: [
        {
          path: '/login',
          name: 'login',
          component: (resolve) => require(['@/views/login'], resolve)
        },
        {
          path: '/register',
          name: 'register',
          component: (resolve) => require(['@/views/register'], resolve)
        }, {
          path: '/essayupdate/:id',
          name: 'essayupdate',
          component: (resolve) => require(['@/views/essayupdate'], resolve)
        }
      ]
    },
    {
      path: '/home',
      component: HomeIndex,
      children: [
        {
          path: '/home',
          name: 'home',
          component: (resolve) => require(['@/views/home'], resolve)
        },
        {
          path: '/essaydetail/:id',
          name: 'essaydetail',
          component: (resolve) => require(['@/views/essaydetail'], resolve)
        }, {
          path: '/code',
          name: 'code',
          component: (resolve) => require(['@/views/code'], resolve)
        }, {
          path: '/life',
          name: 'life',
          component: (resolve) => require(['@/views/life'], resolve)
        }, {
          path: '/author',
          name: 'author',
          component: (resolve) => require(['@/views/author'], resolve)
        }, {
          path: '/labels/:name',
          name: 'labels',
          component: (resolve) => require(['@/views/labels'], resolve)
        }, {
          path: '/search',
          name: 'search',
          component: (resolve) => require(['@/views/search'], resolve)
        }
      ]
    }
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
