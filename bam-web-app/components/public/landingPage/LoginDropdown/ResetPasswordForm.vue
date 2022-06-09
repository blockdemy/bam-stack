<template>
  <div>
    <TextInput
      :label="$t('label-username')"
      :value="username"
      :disabled="true"
      name="username"
      type="text"
      @input="onUsernameChange"
    />
    <TextInput
      :label="$t('label-new-password')"
      name="newpassword"
      type="password"
      @input="onPasswordChange"
    />
    <Button
      button-style="primary"
      button-type="input"
      @on-press="onSetNewPassword"
      >{{ $t('label-reset') }}</Button
    >
    <a class="label" href="#" @click.prevent="$emit('on-cancel')">{{
      $t('label-cancel')
    }}</a>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Button from '~/components/public/landingPage/Button/Button'
import TextInput from '~/components/public/landingPage/TextInput/TextInput'

export default {
  components: {
    Button,
    TextInput
  },
  data() {
    return {
      username: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['currentCredentials'])
  },
  mounted() {
    this.setPassword('')
    const { username } = this.currentCredentials
    this.username = username
  },
  methods: {
    ...mapActions('auth', ['setNewPassword', 'setPassword', 'setUsername']),
    ...mapMutations('auth', ['setAuthError']),
    onUsernameChange({ target }) {
      this.setUsername(target.value)
    },
    onPasswordChange({ target }) {
      this.setPassword(target.value)
    },
    async onSetNewPassword() {
      const { username, password } = this.currentCredentials
      if (!username || !password) {
        return this.setAuthError({
          message: 'Invalid credentials',
          name: 'NEW_PASSWORD_REQUIRED'
        })
      }
      try {
        await this.setNewPassword()
        this.$emit('on-success')
      } catch (error) {
        return false
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

.info {
  font-size: 12px;
  text-align: left;
  margin-bottom: 20px;
}
</style>
