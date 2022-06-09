export default function({ route, store, error }) {
  if (process.server) {
    return
  }
  const {
    publicUser,
    privateUser,
    adminUser
  } = route.matched[0].components.default.options.authorization
  if (
    (publicUser && store.state.me.isPublicUser) ||
    (privateUser && store.state.me.isPrivateUser) ||
    (adminUser && store.state.me.isAdminUser)
  ) {
    return
  }
  error({ statusCode: 403 })
}
