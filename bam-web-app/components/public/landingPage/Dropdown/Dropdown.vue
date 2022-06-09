<template>
  <div
    :class="{ 'is-active': isActive }"
    class="dropdown"
    @click="toggleActive()"
  >
    <div class="dropdown-trigger" onclick="void(0)">
      <span v-if="defaultText">{{ defaultText }}</span>
      <slot name="trigger"></slot>
      <Icon :size="10" icon-name="down-chevron" class="dropdown-icon" />
    </div>
    <div id="dropdown-menu" class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/public/landingPage/Icon/Icon'

export default {
  components: {
    Icon
  },
  props: {
    defaultText: {
      type: String,
      default: ''
    }
  },
  data() {
    const isActive = false
    return {
      isActive
    }
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-icon {
  margin-left: 10px;
}

.dropdown {
  .dropdown-trigger {
    width: 100%;
    height: unset;
  }
}
</style>
