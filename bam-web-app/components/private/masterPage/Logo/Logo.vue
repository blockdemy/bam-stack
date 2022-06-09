<template>
  <div>
    <style v-if="color">
      {{ `
        svg.bam-logo.monochrome > .logo-vessel,
        svg.bam-logo.monochrome > .logo-text {
          fill: ${color};
        }
      ` }}
    </style>
    <bam-logo
      :class="{
        monochrome: color,
        'is-animated': isAnimated,
        'is-small': isSmall
      }"
    />
  </div>
</template>

<script>
import BamLogo from '~/assets/images/bam-logo.svg?inline'

export default {
  components: {
    BamLogo
  },
  props: {
    color: {
      type: String,
      default: ''
    },
    isAnimated: {
      type: Boolean,
      default: false
    },
    isSmall: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
svg.bam-logo {
  > .logo-vessel {
    fill: #b0b7bb;
  }
  > .logo-text {
    fill: #005687;
  }

  &.is-animated {
    position: relative;
    width: 120px;

    > .logo-right {
      transition: transform 0.3s ease-out;
    }

    > .logo-text {
      opacity: 1;
      transition: opacity 0.25s;
      transition-delay: 0.2s;
    }

    &.is-small {
      > .logo-text {
        opacity: 0;
        transition-delay: 0s;
      }

      > .logo-right {
        transform: translate(-450px, 0);
      }
    }
  }
}
</style>
