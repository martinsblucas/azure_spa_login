import * as msal from '@azure/msal-browser'

export default new msal.PublicClientApplication({
  auth: {
    clientId: process.env.VUE_APP_AD_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.VUE_APP_AD_TENANT_ID}`,
    redirectUri: process.env.VUE_APP_AD_REDIRECT_URL,
  },
})
