import axios from 'axios'
import store from '../store'

const service = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    headers: {
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 5000,
})
service.interceptors.request.use(
    (config) => {
        console.log('calling', config.url, 'with', config.params)
        //--- add Authorization
        const token = store.state.auth.token
        config.headers.Authorization = token ? `${token}` : ''
        return config
    },
    (error) => {
        console.log(error)
        Promise.reject(error)
    },
)
service.interceptors.response.use(
    (response) => {
        if (response.status === 403) {
            store.dispatch('auth/logout')
        }
        return response
    },
    (error) => {
        if (error.response.status === 403) {
            store.dispatch('auth/logout')
        }
        console.log('REQUEST ERROR: ' + error)
        return Promise.reject(error)
    },
)

export default service
