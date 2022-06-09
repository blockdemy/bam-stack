export default function(context) {
  const isAuthenticated =
    context.store.state.me.isAdminUser || context.store.state.me.isPrivateUser
  return isAuthenticated ? 'private' : 'public'
}
