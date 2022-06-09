export default async function({ store, app: { $cognito }, redirect }) {
  if (process.server) {
    return
  }
  try {
    const session = await $cognito.getCurrentUserSession()
    if (session) {
      await store.commit('me/setIdentity', session.getIdToken().payload)
    } else {
      return await store.commit('me/unsetIdentity')
    }
  } catch (e) {
    // invalid session - re-login
    // TODO: show session expired message
    return store.commit('me/signOut')
  }
}
