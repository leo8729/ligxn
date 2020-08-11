import { stuLogin, teaLogin, logout, getStuInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  stuLogin({ commit }, userInfo) {
    const { username, identifyingcode, spassword } = userInfo
    return new Promise((resolve, reject) => {
      stuLogin({ phone: username.trim(), vcode: identifyingcode, spassword: spassword }).then(response => {
        console.log(response)
        const respResult = response.respResult
        commit('SET_TOKEN', respResult.token)
        setToken(respResult.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  teaLogin({ commit }, userInfo) {
    const { username, identifyingcode, spassword } = userInfo
    return new Promise((resolve, reject) => {
      teaLogin({ phone: username.trim(), vcode: identifyingcode, spassword: spassword }).then(response => {
        console.log(response)
        const respResult = response.respResult
        commit('SET_TOKEN', respResult.token)
        setToken(respResult.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getStuInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(state)
      console.log(state.token)
      getStuInfo({ token: state.token }).then(response => {
        console.log(response)
        const data = response.respResult

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        // const { name, avatar } = data
        commit('SET_NAME', data.realname)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

