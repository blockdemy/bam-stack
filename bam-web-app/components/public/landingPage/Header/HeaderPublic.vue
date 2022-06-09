<template>
  <header class="columns nav-public">
    <div class="column is-three-fifths">
      <nuxt-link :to="localePath('index')">
        <Logo class="nav-logo" />
      </nuxt-link>
    </div>
    <div class="column column-container">
      <span class="mobile-condition lang-dropdown nv-m-right-30">
        <LanguageSwitcher />
      </span>
    </div>
    <div class="column dropdown-container">
      <div class="login-dropdown">
        <no-ssr>
          <!--<ProfileMenu class="mobile-condition" />-->
          <LoginDropdown />
        </no-ssr>
      </div>
    </div>
  </header>
</template>

<script>
// import { mapGetters, mapState } from 'vuex'
// import Button from '~/components/public/landingPage/Button/Button'
import LanguageSwitcher from '~/components/public/landingPage/LanguageSwitcher/LanguageSwitcher'
import LoginDropdown from '~/components/public/landingPage/LoginDropdown/LoginDropdown'
import Logo from '~/components/public/landingPage/Logo/Logo'
// import ProfileMenu from '~/components/public/landingPage/ProfileMenu/ProfileMenu'

export default {
  components: {
    LanguageSwitcher,
    LoginDropdown,
    Logo
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';

.nav-public {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  z-index: 2;
  background-image: url('../../../../assets/images/background-img.jpg');
  background-size: $public-background-size;
  background-repeat: no-repeat;

  &.columns {
    padding: 0 160px 0 35px;
    display: flex;
  }

  .nav-logo {
    margin-top: 5px;
    width: 120px;
  }

  .login-dropdown {
    position: absolute;
    top: 0;
    right: 0;
  }

  .dropdown-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    flex-basis: auto;
  }

  .column-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .local-link {
    justify-content: flex-end;
  }
}

@media (max-width: $mobile-size) {
  .nav-public {
    background-size: 1125px;

    &.columns {
      padding: 0 0 0 35px;
    }

    .mobile-condition {
      display: none;
    }
  }
}

@media (min-width: $public-background-size) {
  .nav-public {
    background-size: cover;
  }
}
</style>

<style lang="scss">
.nav-public {
  .lang-dropdown,
  .profile-menu {
    .dropdown-trigger {
      height: 50px !important;
    }
  }
}
</style>
