// it have to be a middleware, but need a workaround for our 'universal generate' strategy
export default {
  beforeCreate() {
    if (process.server) {
      console.log('autho 1')
      return
    }
    const { publicUser, privateUser, adminUser } = this.$options.authorization
    if (
      (publicUser && this.$store.state.me.isPublicUser) ||
      (privateUser && this.$store.state.me.isPrivateUser) ||
      (adminUser && this.$store.state.me.isAdminUser)
    ) {
      console.log('autho 2')
      return
    }
    console.log('autho 3')
    this.$nuxt.error({ statusCode: 403 })
  }
}
