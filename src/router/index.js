import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Inform from '@/components/Inform'
import Viewscore from '@/components/Viewscore'
import Areadyinter from '@/components/Areadyinter'
import Areadyenroll from '@/components/Areadyenroll'

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
        }
      ]
    
    },{
      path:'/login',
      name:'Login',
      component:Login
    }
  ]
})

