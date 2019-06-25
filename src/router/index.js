import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Inform from '@/components/Inform'
import Viewscore from '@/components/Viewscore'
import Areadyinter from '@/components/Areadyinter'
import Areadyenroll from '@/components/Areadyenroll'
import Nopass from '@/components/Nopass'
import Admin from '@/components/Admin'
import Adminsetting from '@/components/Adminsetting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path:'/inform',
          name:'Inform',
          component:Inform
        },{
          path:'/viewscore',
          name:'Viewscore',
          component:Viewscore
        },{
          path:'/areadyinter',
          name:'Areadyinter',
          component:Areadyinter
        },{
          path:'/areadyenroll',
          name:'Areadyenroll',
          component:Areadyenroll
        },{
          path:'/nopass',
          name:'Nopass',
          component:Nopass
        },{
          path:'/admin',
          name:'Admin',
          component:Admin
        },{
          path:'/adminsetting',
          name:'Adminsetting',
          component:Adminsetting
        }
      ]
    
    },{
      path:'/login',
      name:'Login',
      component:Login
    }
  ]
})

