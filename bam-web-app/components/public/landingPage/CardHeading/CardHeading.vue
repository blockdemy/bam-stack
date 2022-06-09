<template>
  <div>
    <div
      :class="{ 'is-hidden-mobile': isSubtitleHidden }"
      class="nv-m-bottom-25"
    >
      <label class="l1">{{ subtitle }}</label>
    </div>
    <div class="title-container">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '',
      type: String
    },
    subtitle: {
      default: '',
      type: String
    },
    isSubtitleHidden: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';

.l1 {
  color: $color-label-head;
}

.content h2:not(:last-child) {
  margin: 0;
}

.title-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
