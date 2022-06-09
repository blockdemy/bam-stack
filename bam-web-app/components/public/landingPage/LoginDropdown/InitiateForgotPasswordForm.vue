<template>
  <div>
    <TextInput
      :label="$t('label-username')"
      name="username"
      type="text"
      @input="username"
    />
    <Button
      button-style="primary"
      button-type="input"
      @on-press="onInitiateForgotPassword"
      >{{ $t('label-get-code') }}</Button
    >
    <a class="label" href="#" @click="toggleForgotPassword">{{
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
  computed: {
    ...mapGetters('auth', ['currentCredentials'])
  },
  methods: {
    ...mapMutations('auth', ['setAuthError']),
    ...mapActions('auth', ['setUsername']),
    toggleForgotPassword(e) {
      e.preventDefault()
      this.$emit('on-cancel')
    },
    onInitiateForgotPassword() {
      if (!this.currentCredentials.username) {
        return this.setAuthError('Invalid username')
      }
      this.$emit('on-progress')
    },
    username({ target }) {
      this.setUsername(target.value)
    },
    setNewPassword({ target }) {
      this.newPassword = target.value
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
