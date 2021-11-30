import msal from '../plugins/msal'
import router from '../router'

export default {
  namespaced: true,

  state() {
    return {
      isAuthenticated: false,
      token: null,
      username: null,
    }
  },

  getters: {
    token(state) {
      return state.token
    },

    username(state) {
      return state.username
    },

    isAuthenticated(state) {
      return state.isAuthenticated
    },
  },

  mutations: {
    setToken(state, payload) {
      state.token = payload
    },

    setUsername(state, payload) {
      state.username = payload
    },

    isAuthenticated(state, payload) {
      state.isAuthenticated = payload
    },
  },

  actions: {
    auth: async ({ getters, dispatch }, { redirectTo }) => {
      if (getters.username) {
        const silent = await silentLogin(getters.username)
        if (silent) {
          dispatch('setUser', {
            token: silent.accessToken,
            username: silent.account.username,
          })
          if (redirectTo) router.push(redirectTo)
          // api.auth(user) ~> sends user to auth endpoint and generates ourself api token
          return
        }
      }

      const handle = await handleLogin()
      if (handle) {
        dispatch('setUser', {
          token: handle.accessToken,
          username: handle.account.username,
        })
        // api.auth(user) ~> sends user to auth endpoint and generates ourself api token
        if (redirectTo) router.push(redirectTo)
        return
      }

      await loginRedirect()
    },

    setUser({ commit }, { token, username }) {
      commit('isAuthenticated', true)
      commit('setToken', token)
      commit('setUsername', username)
    },

    logout({ commit }) {
      commit('isAuthenticated', false)
      commit('setToken', null)
      commit('setUsername', null)
    },
  },
}

const getRequest = () => ({
  scopes: ['User.Read'],
})

const handleLogin = async () => {
  try {
    const data = await msal.handleRedirectPromise()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

const silentLogin = async (username) => {
  try {
    const data = await msal.ssoSilent({ ...getRequest(), loginHint: username })
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

const loginRedirect = async () => {
  try {
    await msal.loginRedirect(getRequest())
  } catch (error) {
    console.error(error)
  }
}
