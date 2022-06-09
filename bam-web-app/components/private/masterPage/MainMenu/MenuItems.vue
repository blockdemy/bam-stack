<template>
  <div class="nv-is-full-height">
    <div class="nv-is-full-height nv-is-spreaded">
      <!--<div v-if="isPrivateUser">-->
      <div>
        <MenuItem
          :text="$t('menu-bam-account-access')"
          path="nav-access-accounts"
          icon-name="crew"
        />
        <!--<MenuItem :text="$t('menu-clients')" path="clients" icon-name="crew" />
        <MenuItem
          :text="$t('menu-clients-position')"
          path="clt-positions"
          icon-name="crew"
        />
        <MenuItem
          :text="$t('menu-clients-employee')"
          path="clt-employees"
          icon-name="crew"
        />

        <MenuItem
          :text="$t('menu-clients-account-access')"
          path="clt-access-accounts"
          icon-name="crew"
        />-->

        <!--<MenuItem
          :text="$t('menu-contracts')"
          path="contracts"
          icon-name="contracts"
        />
        <MenuItem
          :text="$t('menu-documents')"
          path="documents"
          icon-name="document"
        />
        <MenuItem
          :text="$t('menu-search')"
          path="availability-checker"
          icon-name="search"
        />
        <MenuItem
          :text="$t('menu-fuel-calculator')"
          path="fuel-calculator"
          icon-name="fuel"
        />-->
      </div>

      <!--<div v-if="isAdminUser">
        <MenuItem
          :text="$t('menu-quote-requests')"
          path="quote-requests"
          icon-name="quote-requests"
        />
        <MenuItem
          :text="$t('menu-contracts')"
          path="contracts"
          icon-name="compass"
        />
        <MenuItem
          :text="$t('menu-inventory')"
          path="inventory"
          icon-name="inventory"
        />
        <MenuItem
          :text="$t('menu-accounts')"
          path="accounts"
          icon-name="crew"
        />
      </div>-->

      <!--<div v-if="isAdminUser" class="auth-items">
        <div class="separator"></div>
        <MenuItem
          :text="$t('menu-search')"
          path="availability-checker"
          icon-name="search"
        />
        <MenuItem
          :text="$t('menu-fuel-calculator')"
          path="fuel-calculator"
          icon-name="fuel"
        />
      </div>-->
    </div>
  </div>
</template>

<script>
import MenuItem from './MenuItem'

export default {
  components: {
    MenuItem
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
  }
}
</script>

<style lang="scss">
@import '~assets/styles/colors';

.main-menu,
.mobile-menu {
  .separator {
    margin: 10px 20px 20px;
    border-top: 1px solid $color-menu-item-separator;
  }
}

@media (max-height: 540px) {
  .auth-items {
    display: none;
  }
}
</style>
