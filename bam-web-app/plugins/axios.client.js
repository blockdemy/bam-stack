// import { get } from 'lodash'

export default function({ $axios, app: { $cognito }, store, redirect }) {
  $axios.onRequest(async config => {
    const session = await $cognito.getCurrentUserSession()
    // const isS3Source = get(config, 'data.isS3Source')

    // if (session && !isS3Source) {
    if (session) {
      config.headers.Authorization = `Bearer: ${session
        .getIdToken()
        .getJwtToken()}`
    }
    return config
  })

  $axios.onRequestError(_error => {
    // invalid session - re-login
    // TODO: show session expired message
    return store.commit('me/signOut')
  })

  $axios.onResponseError(error => {
    if (error.response && error.response.status === 401) {
      // invalid id tocken - re-login
      // TODO: show session expired message
      return store.commit('me/signOut')
    }
  })
}
