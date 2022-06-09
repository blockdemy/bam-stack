<template>
  <div class="m-bottom-50 column is-paddingless">
    <h2 class="p-bottom-25">{{ cardTitle }}</h2>
    <div class="column is-two-thirds is-paddingless">
      <p class="small">{{ cardSubtitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardTitle: {
      default: '',
      type: String
    },
    cardSubtitle: {
      default: '',
      type: String
    }
  }
}
</script>
