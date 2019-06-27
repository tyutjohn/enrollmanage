import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//创建vuex实例
const store=new Vuex.Store({
    state:{
        username:'',
        rank:''
    },
    getters:{

    },
    mutations:{
        SaveLoginIfno(state,username){
            state.username=username
        }
    },
    actions:{
        SaveLoginIfno(state,username){
            state.commit('SaveLoginIfno',username)
        }
    }
})

export default store;