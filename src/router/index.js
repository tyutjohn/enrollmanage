import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Inform from '@/components/Inform'

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
        }
      ]
    
    },{
      path:'/login',
      name:'Login',
      component:Login
    }
  ]
})

