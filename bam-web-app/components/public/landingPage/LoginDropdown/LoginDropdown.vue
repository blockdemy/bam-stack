<template>
  <div :class="{ 'is-active': showDropdown }" class="dropdown">
    <div
      :class="{
        show: showDropdown
      }"
      class="click-away"
      @click.prevent="toggle"
    ></div>
    <div class="dropdown-trigger" @click="toggle">
      {{ $t('label-login') }}
      <Icon :size="10" icon-name="down-chevron" class="dropdown-icon" />
    </div>
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div v-if="isLoading">
          <p>Loading...</p>
        </div>
        <div v-if="currentUserError" class="error-container">
          <p class="error-message-text">
            <Icon icon-name="error" class="error-icon" :size="16" />
            {{ currentUserError.message }}
          </p>
          <div v-if="requiresPasswordReset">
            <p class="error-requirements-text">
              {{ $t('reset-password-requirements') }}
            </p>
          </div>
        </div>
        <InitiateForgotPasswordForm
          v-if="isForgotPasswordInitiated"
          @on-progress="startForgotPassword"
          @on-cancel="clearForgotPassword"
        />
        <EnterForgotPasswordCodeForm
          v-else-if="showForgotPassword"
          @on-success="clearForgotPassword"
          @on-cancel="clearForgotPassword"
        />
        <ResetPasswordForm
          v-else-if="requiresPasswordReset"
          @on-success="clearForgotPassword"
          @on-cancel="clearForgotPassword"
        />
        <UsernamePasswordForm
          v-else
          @on-success="setInitializeForgotPassword"
          @on-cancel="clearForgotPassword"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'
import UsernamePasswordForm from './UsernamePasswordForm'
import EnterForgotPasswordCodeForm from './EnterForgotPasswordCodeForm'
import InitiateForgotPasswordForm from './InitiateForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'
import Icon from '~/components/public/landingPage/Icon/Icon'

export default {
  components: {
    Icon,
    UsernamePasswordForm,
    EnterForgotPasswordCodeForm,
    InitiateForgotPasswordForm,
    ResetPasswordForm
  },
  data() {
    return {
      showDropdown: false,
      isForgotPasswordInitiated: false,
      showForgotPassword: false
    }
  },
  computed: {
    ...mapState('auth', ['isLoading']),
    ...mapGetters('auth', ['requiresPasswordReset', 'currentUserError'])
  },
  methods: {
    ...mapMutations('auth', ['setAuthError']),
    ...mapActions('auth', ['initiateForgotPassword']),
    clearErrors() {
      // this function is just to work with users Auth
      this.setAuthError(null)
    },
    toggle() {
      this.showDropdown = !this.showDropdown
      if (!this.showDropdown) {
        this.clearErrors()
      }
    },
    async startForgotPassword() {
      await this.initiateForgotPassword()

      if (!this.currentUserError) {
        this.showForgotPassword = true
        this.isForgotPasswordInitiated = false
      }
    },
    clearForgotPassword() {
      this.showForgotPassword = false
      this.isForgotPasswordInitiated = false
      this.clearErrors()
    },
    setInitializeForgotPassword() {
      this.showForgotPassword = false
      this.isForgotPasswordInitiated = true
      this.clearErrors()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';

.dropdown {
  .dropdown-trigger {
    color: $color-header-text;
    z-index: 100;
  }

  &:hover,
  &.is-active {
    .dropdown-trigger {
      color: $color-header-text-hover;
    }
  }

  .click-away {
    position: fixed;
    top: 0px;
    left: -100vw;
    height: 100vh;
    width: 10010em;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.25s ease-in-out;
    z-index: 1;
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }

  .dropdown-icon {
    margin-left: 8px;
  }

  .dropdown-content {
    position: absolute;
    right: 0;
    top: 0;
    width: 416px;
    padding: 65px;
    text-align: center;
    .error-container {
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;
      .error-message-text {
        font-size: 1.2rem;
        text-align: left;
        padding-bottom: 0px;
        color: $color-error;
        display: flex;
        align-items: center;
        .error-icon {
          margin-right: 6px;
        }
      }
      .error-requirements-text {
        color: $color-text;
        font-size: 0.8rem;
        text-align: left;
        padding-left: 22px;
      }
    }
  }

  .dropdown-trigger {
    justify-content: center;
    height: 50px;
    width: 176px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 1.1rem;
    line-height: 1.48;
    letter-spacing: 0.05em;
  }
}

@media (max-width: $mobile-size) {
  .dropdown {
    .dropdown-content {
      width: 320px;
    }
  }
}
</style>
