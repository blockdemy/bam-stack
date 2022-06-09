<template>
  <div>
    <section class="section is-gapless is-paddingless">
      <Card>
        <template v-slot:card-body>
          <div class="error-container">
            <error class="error-icon" />

            <h3 class="error-title">
              {{ $t(errorTitleKey) }}
            </h3>

            <div
              v-if="error.statusCode === 403"
              class="error-description"
              v-html="$t('error-page-403-description')"
            />
            <div
              v-else-if="error.statusCode === 404"
              class="error-description"
              v-html="$t('error-page-404-description')"
            >
              {{ $t('error-page-404-description') }}
            </div>
          </div>
        </template>
      </Card>
    </section>
  </div>
</template>

<script>
// import { Card } from '~/components/private/masterPage'
import Card from '~/components/private/masterPage/Card/Card'
import Error from '~/assets/images/error.svg?inline'

const errors = {
  403: 'error-page-403-title',
  404: 'error-page-404-title'
}

export default {
  layout: 'public',
  components: { Card, Error },
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  head() {
    return {
      title: this.$t(this.errorTitleKey)
    }
  },
  computed: {
    errorTitleKey() {
      return errors[this.error.statusCode] || 'error-page-some-error-title'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
.error-container {
  text-align: center;
  .error-icon {
    margin-top: 64px;
    margin-bottom: 32px;
  }
  .error-title {
    margin: 32px;
  }
  .error-description {
    margin-bottom: 96px;
  }
}
</style>
