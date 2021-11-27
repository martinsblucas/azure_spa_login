export default {
  namespaced: true,

  state() {
    return {
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
  },

  mutations: {
    setToken(state, payload) {
      state.token = payload
    },

    setUsername(state, payload) {
      state.username = payload
    },
  },

  actions: {
    setToken({commit}, payload) {
      commit("setToken", payload)
    },

    setUsername({commit}, payload) {
      commit("setUsername", payload)
    }
  }
}
