import {login,  getUserInfo} from '@/api/user'
import {getToken, setToken, removeToken,setUserName} from '@/utils/auth'
import {resetRouter} from '@/router'
import global from '../../components/Global'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
}

const actions = {
    // user login
    login({commit}, code) {
        return new Promise((resolve, reject) => {
            login({code: code,client_id:process.env.VUE_APP_CLIENT_ID,client_secret:process.env.VUE_APP_CLIENT_SECRET,redirect_uri:process.env.VUE_APP_REDIRECT_URI}).then(response => {
                commit('SET_TOKEN', response.data.access_token)
                setToken(response.data.access_token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getUserInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getUserInfo({token: state.token}).then(response => {
                if (!response) {
                    reject('Verification failed, please Login again.')
                }
                commit('SET_NAME', response.data.name)
                commit('SET_AVATAR', response.data.avatar_url)
                setUserName(response.data.name)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({commit}) {
        return new Promise((resolve) => {
            commit('SET_TOKEN', '')
            removeToken()
            resetRouter()
            resolve()
        })
    },

    // remove token
    resetToken({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        })
    },

}


export default {
    namespaced: true,
    actions,
    state,
    mutations,

}
