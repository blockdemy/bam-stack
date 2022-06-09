<template>
  <div>
    <p class="info">{{ $t('account-forgot-password-info') }}</p>
    <TextInput
      :label="$t('label-verification-code')"
      name="code"
      type="text"
      @input="setCode"
      @blur="setCode"
    />
    <TextInput
      :label="$t('label-new-password')"
      name="newpassword"
      type="password"
      @input="setNewPassword"
      @blur="setNewPassword"
    />
    <Button button-style="primary" button-type="input" @on-press="onReset">
      {{ $t('label-reset') }}
    </Button>
    <a class="label" href="#" @click.prevent="$emit('on-cancel')">{{
      $t('label-cancel')
    }}</a>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Button from '~/components/public/landingPage/Button/Button'
import TextInput from '~/components/public/landingPage/TextInput/TextInput'

export default {
  components: {
    Button,
    TextInput
  },
  data: function() {
    return {
      resetCode: '',
      newPassword: ''
    }
  },
  computed: {
    ...mapState('auth', ['error'])
  },
  methods: {
    ...mapMutations('auth', ['setAuthError']),
    ...mapActions('auth', ['confirmPassword']),
    async onReset() {
      if (!this.resetCode || !this.newPassword) {
        return this.setAuthError({ message: 'Missing required fields' })
      }
      await this.confirmPassword({
        code: this.resetCode,
        newPassword: this.newPassword
      })
      if (!this.error) {
        this.$emit('on-success')
      }
    },
    setCode({ target }) {
      this.resetCode = target.value
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

.info {
  font-size: 12px;
  text-align: left;
  margin-bottom: 20px;
}
</style>
