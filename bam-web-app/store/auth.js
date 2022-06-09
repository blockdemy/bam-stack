const {
  authenticate,
  resetPassword,
  checkCurrentState,
  logoutUser,
  forgotPassword,
  confirmPassword
} = require('../utils/aws-utils/authenticate')

export const state = () => ({
  user: null,
  username: '',
  password: '',
  isAuthenticated: false,
  isLoading: false,
  error: null
})

export const getters = {
  requiresPasswordReset: state => {
    return state.error && state.error.name === 'NEW_PASSWORD_REQUIRED'
  },
  currentUser: state => {
    return state.user
  },
  currentUserError: state => {
    return state.error
  },
  currentCredentials: state => {
    const { username, password } = state
    return {
      username,
      password
    }
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setUsername(state, username) {
    state.username = username
  },
  setUserPassword(state, password) {
    state.password = password
  },
  setIsAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setAuthError(state, error) {
    state.error = error
  },
  setLogout(state) {
    state.user = null
    state.username = ''
    state.password = ''
    state.isAuthenticated = false
    state.isLoading = false
    state.error = null
  }
}

const commitError = (commit, error) => {
  commit('setLoading', false)
  commit('setAuthError', error)
}

export const actions = {
  async initiateForgotPassword({ commit, state }) {
    commit('setLoading', true)
    commit('setAuthError', null)
    try {
      await forgotPassword(state.username)
      commit('setLoading', false)
    } catch (error) {
      commitError(commit, error)
    }
  },
  async confirmPassword({ commit }, { code, newPassword }) {
    commit('setLoading', true)
    commit('setAuthError', null)
    try {
      await confirmPassword(code, newPassword)
      commit('setLoading', false)
    } catch (error) {
      commitError(commit, error)
    }
  },
  async attemptLogin({ commit, state }) {
    const { username, password } = state
    commit('setLoading', true)
    commit('setAuthError', null)
    try {
      const user = await authenticate(username, password)
      commit('setUser', user)
      commit('setIsAuthenticated', true)
      commit('setLoading', false)
    } catch (error) {
      commitError(commit, error)
    }
  },
  async setNewPassword({ commit, state }) {
    commit('setLoading', true)
    try {
      await resetPassword(state.password)
      commit('setAuthError', null)
      commit('setLoading', false)
    } catch (error) {
      commitError(commit, error)
    }
  },
  async checkCurrentAuthenticatedState({ commit, state }) {
    try {
      const user = await checkCurrentState()
      if (user) {
        commit('setUser', user)
        commit('setIsAuthenticated', true)
      }
      return user
    } catch (error) {
      return false
    }
  },
  async logout({ commit }) {
    try {
      await logoutUser()
      commit('setLogout')
    } catch (error) {
      commitError(commit, error)
    }
  },
  setUsername({ commit }, value) {
    commit('setUsername', value)
  },
  setPassword({ commit }, value) {
    commit('setUserPassword', value)
  }
}
