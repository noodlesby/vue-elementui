import Vue from 'vue';
import Router from 'vue-router';
import { Message } from 'element-ui';

import Login from '@/components/login/login';
import Home from '@/components/home/home';
import UserList from '@/components/userlist/user-list';
import RoleList from '@/components/rolelist/role-list';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'userlist',
          path: '/userlist',
          component: UserList
        },
        {
          name: 'rolelist',
          path: '/rolelist',
          component: RoleList
        }
      ]
    }
  ]
});

// 配置路由的拦截器
router.beforeEach((to, from, next) => {
  // 如果访问登录的路由地址，放过
  if (to.name === 'login') {
    next();
  } else {
    // 如果请求的不是登录页面，验证token
    // 1. 获取本地存储中的token
    const token = localStorage.getItem('token');
    if (!token) {
      Message({
        type: 'warning',
        message: '请先登录!'
      });
      // 2. 如果没有token，跳转到登录
      next({
        name: 'login'
      });
    } else {
      // 3. 如果有token，继续往下执行
      next();
    }
  }
});

export default router;
