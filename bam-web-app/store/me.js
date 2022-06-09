export const state = () => ({
  identity: null,
  isPublicUser: true,
  isPrivateUser: false,
  isAdminUser: false,
  currentUser: null
})

const processUserAttributes = user => {
  const attrs = {}
  Object.keys(user).map(k => {
    const key = k.indexOf('custom') > -1 ? k.split(':')[1] : k
    attrs[key] = user[k]
  })
  return attrs
}

export const getters = {
  isAdminUser: state => state.isAdminUser,
  isPrivateUser: state => state.isPrivateUser,
  isPublicUser: state => state.isPublicUser,
  currentUser: state => state.currentUser
}

export const mutations = {
  setIdentity(state, identity) {
    state.identity = identity
    state.isPublicUser = false
    state.currentUser = processUserAttributes(state.identity)

    // RH CHANGED THIS PART

    if (
      identity['cognito:groups'] &&
      identity['cognito:groups'].indexOf('Bam') !== -1
      // identity['cognito:groups'].indexOf('Testing') !== -1
    ) {
      state.isPrivateUser = false
      state.isAdminUser = true
    } else {
      state.isPrivateUser = true
      state.isAdminUser = false
    }
  },
  unsetIdentity(state) {
    state.identity = null
    state.isPublicUser = true
    state.isPrivateUser = false
    state.isAdminUser = false
    state.currentUser = null
  }
}

export const actions = {
  signOut({ commit }) {
    this.$cognito.currentUserSignOut()
    commit('unsetIdentity')
    this.$router.push(this.app.localePath('index'))
  }
}
