<template>
  <nav class="navbar">
    <div class="wrapper is-hidden-mobile is-hidden-tablet-only">
      <ProfileMenu />
      <LanguageSwitcher class="m-right-60 menu-dropdown" />
    </div>
    <div class="wrapper_mobile level is-mobile is-hidden-desktop">
      <Icon
        id="test_mobile_main_menu_open"
        icon-name="list"
        @click.native="toggle"
      />
      <nuxt-link
        :to="localePath(isAdminUser ? 'quote-requests' : 'contracts')"
        class="logo"
      >
        <Logo is-animated />
      </nuxt-link>
      <MobileMainMenu
        v-show="isMenuOpened"
        :is-menu-opened="isMenuOpened"
        :is-admin-user="isAdminUser"
        :is-private-user="isPrivateUser"
        :toggle="toggle"
      />
    </div>
  </nav>
</template>

<script>
import LanguageSwitcher from '~/components/private/masterPage/LanguageSwitcher/LanguageSwitcher'
import ProfileMenu from '~/components/private/masterPage/ProfileMenu/ProfileMenu'
import Logo from '~/components/private/masterPage/Logo/Logo'
import MobileMainMenu from '~/components/private/masterPage/MobileMainMenu/MobileMainMenu'
import Icon from '~/components/private/masterPage/Icon/Icon'

export default {
  components: {
    LanguageSwitcher,
    ProfileMenu,
    MobileMainMenu,
    Logo,
    Icon
  },
  props: {
    isAdminUser: {
      type: Boolean,
      default: false
    },
    isPrivateUser: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMenuOpened: false
    }
  },
  methods: {
    toggle() {
      this.isMenuOpened = !this.isMenuOpened
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';

.wrapper {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 50px;
  padding-right: 40px;
  align-items: center;
}

.wrapper_mobile {
  width: 100vw;
  padding: 15px;
}
</style>
