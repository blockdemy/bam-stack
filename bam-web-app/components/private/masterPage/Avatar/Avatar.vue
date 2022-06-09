<template>
  <div
    :style="{
      height: `${size}px`,
      width: `${size}px`
    }"
    class="avatar-container"
  >
    <p
      :style="{
        fontSize: `${fontSize}px`
      }"
    >
      {{ initials.toUpperCase() }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    initials: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 10
    },
    size: {
      type: Number,
      default: 26
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';

.avatar-container {
  flex-direction: column;
  background-color: $color-avatar;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  p {
    color: $color-avatar-initals-text;
  }
}
</style>
