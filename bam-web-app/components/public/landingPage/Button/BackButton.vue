<template>
  <div class="back-button">
    <Button
      :button-route="path"
      is-back-button
      class="button is-inline"
      button-style="tertiary"
      button-type="route"
      >{{ $t(`back-to-${path}`) }}</Button
    >
  </div>
</template>

<script>
import Button from '~/components/public/landingPage/Button/Button'
export default {
  components: {
    Button
  },
  props: {
    path: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.back-button {
  margin-bottom: 12px;
}

.is-inline {
  white-space: nowrap;
}
</style>
