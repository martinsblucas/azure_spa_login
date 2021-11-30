import msal from '../plugins/msal'
import router from '../router'

export default {
  namespaced: true,

  state() {
    return {
      isAuthenticated: false,
      token: null,
      expiresOn: null,
      username: null,
    }
  },

  getters: {
    isAuthenticated(state, getters) {
      return state.isAuthenticated && getters.isValidToken
    },

    isValidToken(state) {
      if (!state.expiresOn) return false
      return new Date() < new Date(state.expiresOn)
    },

    token(state) {
      return state.token
    },

    expiresOn(state) {
      return state.expiresOn
    },

    username(state) {
      return state.username
    },
  },

  mutations: {
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload
    },

    setToken(state, payload) {
      state.token = payload
    },

    setExpiresOn(state, payload) {
      state.expiresOn = payload
    },

    setUsername(state, payload) {
      state.username = payload
    },
  },

  actions: {
    auth: async ({ getters, dispatch }, { redirectTo }) => {
      if (getters.username) {
        const silent = await silentLogin(getters.username)
        if (silent) {
          dispatch('setUser', {
            token: silent.accessToken,
            expiresOn: silent.expiresOn,
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
          expiresOn: handle.expiresOn,
          username: handle.account.username,
        })
        // api.auth(user) ~> sends user to auth endpoint and generates ourself api token
        if (redirectTo) router.push(redirectTo)
        return
      }

      await loginRedirect()
    },

    setUser({ commit }, { token, expiresOn, username }) {
      commit('isAuthenticated', true)
      commit('setToken', token)
      commit('setExpiresOn', expiresOn)
      commit('setUsername', username)
    },

    logout({ commit }) {
      commit('isAuthenticated', false)
      commit('setToken', null)
      commit('setExpiresOn', null)
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
