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
      next();
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