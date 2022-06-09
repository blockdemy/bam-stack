<template>
  <aside
    id="test_mobile_main_menu"
    class="mobile-menu is-full-width nv-is-full-height is-spread"
  >
    <Icon class="close" icon-name="close" @click.native="toggle" />
    <MenuItems
      :is-admin-user="isAdminUser"
      :is-private-user="isPrivateUser"
      class="items nv-is-full-height"
    />
    <div class="dropdown-wrapper is-spread">
      <LanguageSwitcher class="dropdown" is-dark-background />
      <ProfileMenu class="dropdown" is-dark-background />
    </div>
  </aside>
</template>

<script>
import Icon from '~/components/private/masterPage/Icon/Icon'
import MenuItems from '~/components/private/masterPage/MainMenu/MenuItems'
import LanguageSwitcher from '~/components/private/masterPage/LanguageSwitcher/LanguageSwitcher'
import ProfileMenu from '~/components/private/masterPage/ProfileMenu/ProfileMenu'

export default {
  components: {
    MenuItems,
    LanguageSwitcher,
    ProfileMenu,
    Icon
  },
  props: {
    isAdminUser: {
      type: Boolean,
      default: false
    },
    isMenuOpened: {
      type: Boolean,
      default: false
    },
    isPrivateUser: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  watch: {
    $route: 'leave'
  },
  methods: {
    leave() {
      if (this.isMenuOpened) this.toggle()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  /*background-image: url('../../../../assets/images/background-menu.png');*/
  background-size: cover;
  overflow: auto;
}

.close {
  position: absolute;
  left: 20px;
  top: 20px;
  color: $color-menu-item;
}

.items {
  width: 300px;
  margin-top: 90px;
  overflow-x: hidden;
}

.dropdown-wrapper {
  display: flex;
  align-items: center;
  min-height: 46px;
  padding: 0 23px;
  margin-bottom: 90px;
  border-top: 1px solid $color-menu-item-separator;
}

.dropdown {
  height: 100%;
}
</style>
