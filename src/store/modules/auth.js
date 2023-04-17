import {login as api_login} from '@/api/auth'
import base from '@/store/modules/base'
import router from '@/router';

const state = {
    token: localStorage.getItem('auth_token') || '',
    user: JSON.parse(localStorage.getItem('auth_user') || '{}'),
}

const getters = {
    isAuthenticated: (state) => state.token !== '',
    user: (state) => state.user,
}

const mutations = {
    login(state, user_data) {
        state.token = user_data.token
        state.user = user_data.user
        localStorage.setItem('auth_token', user_data.token)
        localStorage.setItem('auth_user', JSON.stringify(user_data.user))
    },
    logout(state) {
        state.token = ''
        state.user = {}
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
    },
}

const actions = {
    login({commit}, payload) {
        commit('clearNotifications')
        const {username, password} = payload
        return new Promise((resolve, reject) => {
            api_login(username, password)
                .then((response) => {
                    const user = {
                        id: response.data.data.user_id,
                        first_name: response.data.data.first_name,
                        last_name: response.data.data.last_name,
                    }
                    const token = response.data.data.token
                    commit('login', {token, user})
                    resolve(response)
                })
                .catch((error) => {
                    commit('setErrors', error)
                })
        })
    },
    logout({commit}) {
        commit('logout');
        router.push('/login');
    },
}

const auth = {
    namespaced: true,
    modules: {base},
    state,
    mutations,
    actions,
    getters,
}

export default auth
