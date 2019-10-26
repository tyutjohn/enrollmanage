/*
 * @Author: johnwang
 * @since: 2019-05-20 12:08:01
 * @lastTime: 2019-10-18 08:27:43
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Loginconsole from '@/components/Loginconsole'
import Inform from '@/components/Inform'
import Viewscore from '@/components/Viewscore'
import Areadyinter from '@/components/Areadyinter'
import Areadyenroll from '@/components/Areadyenroll'
import Nopass from '@/components/Nopass'
import Admin from '@/components/Admin'
import Adminsetting from '@/components/Adminsetting'
import Repoat from '@/components/Repoat'
import Queryinfor from '@/components/Queryinfor'
import Datavisual from '@/components/Datavisual'
import Error404 from '@/components/Error404'
import Install from '@/components/Install'
import { verifyToken } from '../../server/util/token';

Vue.use(Router)

//路由添加模块
const routes=[
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        auth: true,
      },
      children:[
        {
          path:'/inform',
          name:'Inform',
          component:Inform,
          meta: {
            auth: true
          }
        },{
          path:'/viewscore',
          name:'Viewscore',
          component:Viewscore,
          meta: {
            auth: true
          },
        },{
          path:'/datavisual',
          name:'Datavisual',
          component:Datavisual,
          meta: {
            auth: true
          },
        },{
          path:'/areadyinter',
          name:'Areadyinter',
          component:Areadyinter,
          meta: {
            auth: true
          },
        },{
          path:'/areadyenroll',
          name:'Areadyenroll',
          component:Areadyenroll,
          meta: {
            auth: true
          },
        },{
          path:'/nopass',
          name:'Nopass',
          component:Nopass,
          meta: {
            auth: true
          },
        },{
          path:'/admin',
          name:'Admin',
          component:Admin,
          meta: {
            auth: true,
          },
        },{
          path:'/adminsetting',
          name:'Adminsetting',
          component:Adminsetting,
          meta: {
            auth: true,
          }
        }
      ]
    
    },{
      path:'/loginconsole',
      name:'Loginconsole',
      component:Loginconsole
    },{
      path:'/repoat',
      name:'Repoat',
      component:Repoat
    },{
      path:'/queryinfor',
      name:'Queryinfor',
      component:Queryinfor
    },{
      path:'/404',
      name:'Error404',
      component:Error404
    },{
      path:'/install',
      name:'Install',
      component:Install
    },{
      path: "*", // 此处需特别注意置于最底部
      redirect: "/404"
    }
  ]

const router=new Router({
  routes:routes
});

//路由拦截器
router.beforeEach((to,from,next)=>{
  console.log('进入守卫');
  if(to.meta.auth){
    if(!window.localStorage.getItem('token')==''){
      if(verifyToken(window.localStorage.getItem('token')).User==window.localStorage.getItem('username')){
        next();
      }else{
        next({
          path:'/loginconsole'
        })
      }
    }else{
      next({
        path:'/loginconsole'
      });
    }
  }else{
    next();
  }
})

export default router;