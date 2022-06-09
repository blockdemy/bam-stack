<template>
  <div>
    <div class="box">
      <slot name="card-body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardType: {
      default: 'request',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';

.box {
  border-radius: 0;
  box-shadow: 0 4px 12px $color-card-box-shadow;
}
</style>
