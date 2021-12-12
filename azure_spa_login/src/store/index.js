import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import user from './user'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user'],
})

const store = createStore({
  modules: { user },
  plugins: [vuexLocal.plugin],
})

export default store
