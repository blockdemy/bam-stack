<template>
  <nuxt-link
    :class="{ 'is-active': isActive(path) }"
    :to="localePath(path)"
    class="menu-item"
  >
    <icon :icon-name="iconName" class="menu-item-icon" />
    <label class="menu-item-text l1">{{ text }}</label>
  </nuxt-link>
</template>

<script>
import Icon from '~/components/private/masterPage/Icon/Icon'

export default {
  components: {
    Icon
  },
  props: {
    path: {
      type: String,
      required: true
    },
    iconName: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    isActive(name) {
      return this.$nuxt.$route.path.includes(name)
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/colors';
@import '~assets/styles/screen-sizes';

.menu-item {
  display: block;
  padding: 25px 0 25px 27px;
  border-left: 8px solid transparent;
  margin-bottom: 0px;
  margin-right: 20px;
  color: $color-menu-item-hover;
  font-size: 1.3rem;
  white-space: nowrap;

  @media (max-width: $desktop-size) {
    padding: 14px 0 14px 27px;
  }

  &:hover {
    color: $color-menu-item-hover;
  }

  &.is-active {
    border-left-color: $color-menu-item-current;

    .menu-item-icon {
      opacity: 1;
    }
  }

  &-icon {
    float: left;
    margin-right: 24px;
    width: 20px;
    height: 20px;
    margin-bottom: -4px;
    opacity: 0.5;
  }

  &-text {
    display: inline-block;
    text-transform: uppercase;
    overflow: hidden;
    cursor: pointer;
  }
}

@media (max-height: 706px) {
  .menu-item {
    padding: 2.5vh 0 2.5vh 27px;
  }
}
</style>
