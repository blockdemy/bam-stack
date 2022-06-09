<template>
  <aside
    id="test_main_menu"
    :class="{ 'main-menu small': !isMouseOver }"
    class="main-menu nv-is-full-height is-spread"
    @mouseover="menuHover(true)"
    @mouseleave="menuHover(false)"
    @click="menuTouch()"
  >
    <div class="nv-is-full-height">
      <!--<nuxt-link
        :to="localePath(isAdminUser ? 'quote-requests' : 'contracts')"
        class="logo"
      >-->
      <!--<nuxt-link :to="localePath('quote-requests')" class="logo">-->
      <nuxt-link :to="localePath('nav-access-accounts')" class="logo">
        <Logo :is-small="!isMouseOver" class="main-menu-logo" is-animated />
      </nuxt-link>

      <!--<MenuItems
        :is-admin-user="isAdminUser"
        :is-private-user="isPrivateUser"
        class="nv-is-full-height menu-items"
      />-->
      <MenuItems class="nv-is-full-height menu-items" />
    </div>

    <!--<button v-if="isPrivateUser" @click="newQuote" class="accent">-->
    <!--<button @click="newQuote" class="accent">
      <Icon :size="16" class="icon" icon-name="add" />
      <span :class="{ 'request-quote-text': !isMouseOver }">
        {{ $t('landing-request-quote') }}
      </span>
    </button>-->
  </aside>
</template>

<script>
// import Icon from '~/components/private/masterPage/general/Icon/Icon'
import Logo from '~/components/private/masterPage/Logo/Logo'
import MenuItems from '~/components/private/masterPage/MainMenu/MenuItems'

export default {
  components: {
    Logo,
    MenuItems
  },
  props: {
    isAdminUser: {
      type: Boolean,
      default: true
    },
    isPrivateUser: {
      type: Boolean,
      default: true
    },
    newQuote: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    const isTouchDevice = false
    return {
      isMouseOver: false,
      isTouchDevice
    }
  },
  mounted() {
    'ontouchstart' in document.documentElement
      ? (this.isTouchDevice = true)
      : (this.isTouchDevice = false)
  },
  methods: {
    menuHover(bool) {
      if (!this.isTouchDevice) {
        bool ? (this.isMouseOver = true) : (this.isMouseOver = false)
      }
    },
    menuTouch() {
      if (this.isTouchDevice) {
        this.isMouseOver = !this.isMouseOver
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/colors';
@import '~assets/styles/screen-sizes';

$transition-text: opacity 0.3s, width 0.3s, min-width 0.3s;
$transition-menu: width 0.3s, min-width 0.3s;

.main-menu {
  width: 100%;
  min-width: 225px;
  /*background-image: url('../../../../assets/images/background-menu.png');*/
  background-size: 325px;
  transition: $transition-menu;
  overflow: hidden;

  &.small {
    width: 85px;
    min-width: 0;
    transition: $transition-menu;
    font-size: unset;
    letter-spacing: unset;

    .request-quote-text,
    .menu-item-text {
      opacity: 0;
      width: 0;
      transition: $transition-text;
    }
  }

  &-logo {
    display: inline-block;
    margin: 30px 0 140px 30px;
  }

  .menu-item-text {
    opacity: 1;
    width: 100%;
    transition: $transition-text;
  }

  .accent {
    font-family: 'Open Sans';
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 1.33;
    letter-spacing: 0.037em;
    white-space: nowrap;
    text-transform: uppercase;
    height: 72px;
    width: 100%;
    border: none;
    display: flex;
    align-items: center;
    padding-left: 36px;
    justify-content: flex-start;
    color: $_white;
    background-color: $color-landing-button-quote;
    cursor: pointer;

    &:disabled {
      cursor: default;
    }

    .icon {
      margin-right: 24px;
    }

    .request-quote-text {
      white-space: nowrap;
      transition: opacity 1s;
    }
  }
}

@media (max-height: $small-resolution-height-size) {
  .main-menu-logo {
    margin-bottom: 30px;
  }
}

@media (min-height: $widescreen-size) {
  .main-menu {
    background-size: cover;
  }
}

@media (max-width: $mobile-size) {
  .main-menu {
    font-size: 1.6rem;
    line-height: 1;
  }
}
</style>
