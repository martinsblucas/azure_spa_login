import store from '../store'
import msal from '../plugins/msal'

export const auth = async () => {
  const username = store.getters['user/username']
  const handle = await handleLogin()

  //   if (userHasValidTokenInStore ~> validates ourself api token in api)
  //     return true

  if (handle) {
    store.dispatch('user/setUsername', handle.account.username)
    store.dispatch('user/setToken', handle.accessToken)
    console.log(store.getters['user/username'])
    console.log(store.getters['user/token'])
    // api.auth(user) ~> sends user to auth endpoint and generates ourself api token
    return true
  } else if (username) {
    const silent = await silentLogin(username)
    if (silent) {
      store.dispatch('user/setUsername', silent.account.username)
      store.dispatch('user/setToken', silent.accessToken)
      console.log(store.getters['user/username'])
      console.log(store.getters['user/token'])
      // api.auth(user) ~> sends user to auth endpoint and generates ourself api token
      return true
    }
  } else await loginRedirect()
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
