<template>
  <!---- ICON ENglish ESpanish I made a change tag v-bind instenad component--->
  <v-bind
    :is="IconFile"
    :style="{
      height: `${size}px`,
      width: `${size}px`
    }"
  >
  </v-bind>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    iconName: {
      type: String,
      default: () => null
    },
    size: {
      type: Number,
      default: 16
    }
  },
  computed: {
    IconFile() {
      return () => import(`~/assets/icons/${this.iconName}.svg?inline`)
    }
  }
}
</script>

<style scoped>
svg {
  fill: currentColor;
  flex-shrink: 0;
}
</style>
