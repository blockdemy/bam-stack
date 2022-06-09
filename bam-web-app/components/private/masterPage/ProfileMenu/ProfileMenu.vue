<template>
  <div class="menu-dropdown">
    <Dropdown id="test_profile_menu" class="profile-menu">
      <template v-slot:trigger>
        <Avatar :initials="userInitials" />
        <span class="display-name-container">{{ displayName }}</span>
      </template>

      <template v-slot:default>
        <a class="dropdown-item profile-menu-item" @click.prevent="lgout">{{
          $t('profile-logout')
        }}</a>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Avatar from '~/components/private/masterPage/Avatar/Avatar'
import Dropdown from '~/components/private/masterPage/Dropdown/Dropdown'

export default {
  components: {
    Dropdown,
    Avatar
  },
  computed: {
    ...mapGetters('me', ['currentUser']),
    displayName() {
      const displayName = this.currentUser
        ? `${this.currentUser.firstName} ${this.currentUser.lastName
            .charAt(1)
            .toUpperCase()}.`
        : ''
      return displayName
    },
    userInitials() {
      if (this.currentUser && this.currentUser['cognito:username']) {
        const name = this.currentUser['cognito:username'].split('.')
        const first = name[0]
        const last = name[1]
        return first.charAt(0) + last.charAt(0)
      }
      return ''
    }
  },
  methods: {
    ...mapActions('me', ['signOut']),
    ...mapActions('auth', ['logout']),
    async lgout() {
      await this.logout()
      await this.signOut()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';

.profile-menu {
  .display-name-container {
    padding-left: 5px;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.profile-menu-item {
  color: $color-profile;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 32px;
  margin-right: 7px;
}
</style>
