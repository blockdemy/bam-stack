// import { actions } from '../store/auth'
// import { checkCurrentState } from '../utils/aws-utils/authenticate'
import { mapState } from 'vuex'

export default {
  beforeCreate() {
    this.$store.dispatch('auth/checkCurrentAuthenticatedState')
  },
  computed: {
    ...mapState('auth', ['isAuthenticated'])
  },
  watch: {
    isAuthenticated(val, oldVal) {
      /**
       * TODO -- still investigating the correct way to handle this redirection
       */
      if (val && !oldVal) {
        // logging in
        return this.$router.push('/dashboard')
      }
      if (!val && oldVal) {
        // loggin out
        return this.$router.replace('/')
      }
    }
  }
}
