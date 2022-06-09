<template>
  <div class="error">
    <Icon icon-name="error" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import Icon from '~/components/public/landingPage/Icon/Icon'
export default {
  components: {
    Icon
  },
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  color: $_red;
  span {
    padding-left: 1rem;
    font-size: 1.2rem;
  }
}
</style>
