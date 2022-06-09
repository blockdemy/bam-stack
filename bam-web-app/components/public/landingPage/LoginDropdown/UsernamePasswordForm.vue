<template>
  <div>
    <TextInput
      :label="$t('label-username')"
      name="username"
      type="text"
      @input="username"
    />
    <TextInput
      ref="password"
      :label="$t('label-password')"
      name="password"
      type="password"
      @input="password"
    />
    <Button button-style="primary" button-type="input" @on-press="onLogin">
      {{ $t('label-login') }}
    </Button>
    <a class="label" href="#" @click.prevent="$emit('on-success')">{{
      $t('label-forgot-password')
    }}</a>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import TextInput from '~/components/public/landingPage/TextInput/TextInput'
import Button from '~/components/public/landingPage/Button/Button'

export default {
  components: {
    Button,
    TextInput
  },
  computed: {
    ...mapGetters('auth', ['currentCredentials'])
  },
  methods: {
    ...mapActions('auth', ['attemptLogin', 'setUsername', 'setPassword']),
    ...mapMutations('me', ['setIdentity']),
    ...mapMutations('auth', ['setAuthError']),
    async onLogin(e) {
      const { username, password } = this.currentCredentials
      if (!username || !password) {
        return this.setAuthError({ message: 'Invalid credentials' })
      }
      await this.attemptLogin()
      // trying to avoid touching this component as much as possible, so just leaving it here:
      const session = await this.$cognito.getCurrentUserSession()
      if (session) {
        await this.setIdentity(session.getIdToken().payload)
      }

      if (this.$store.state.me.isPublicUser) {
        this.goTo('index')
      } else if (this.$store.state.me.isPrivateUser) {
        this.goTo('nav-access-accounts')
      } else if (this.$store.state.me.isAdminUser) {
        this.goTo('nav-access-accounts')
      }
    },
    username({ target }) {
      this.setUsername(target.value)
    },
    password({ target }) {
      this.setPassword(target.value)
    },
    goTo(route) {
      console.log('Ruta' + route)
      // this.$router.push(this.app.localePath('index'))
      try {
        this.$router.push(this.localePath(route))
      } catch (err) {
        console.log('Error' + err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  position: absolute;
  bottom: 16px;
  left: 16px;
}
</style>
