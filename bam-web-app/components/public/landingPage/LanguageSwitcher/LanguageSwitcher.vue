<template>
  <!--<div v-if="isVisible">-->
  <div>
    <Dropdown
      id="test_language_switcher"
      :is-dark-background="isDarkBackground"
    >
      <template v-slot:trigger>
        <template>
          <img :src="`/images/${langImages[$i18n.locale]}`" class="lang-icon" />
          {{ $i18n.locale.toUpperCase() }}
        </template>
      </template>

      <template>
        <template v-for="locale in availableLocales">
          <nuxt-link
            v-if="$i18n.locale.code !== locale.code"
            :id="`test_language_switcher_${locale.code}`"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            class="dropdown-item"
          >
            <img
              :src="`/images/${langImages[locale.code]}`"
              class="lang-icon"
            />
            {{ locale.code.toUpperCase() }}
          </nuxt-link>
        </template>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import Dropdown from '~/components/public/landingPage/Dropdown/Dropdown'

export default {
  components: {
    Dropdown
  },
  props: {
    isDarkBackground: Boolean
  },
  data() {
    return {
      langImages: {
        en: 'flag-en.png',
        es: 'flag-es.png'
      }
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    // hiding the language switcher to avoid state clearing issues.  Can extract this out and add to the list for other routes as needed
    isVisible() {
      const fullRouteName = this.$nuxt.$route.name
      const pathOnly = fullRouteName.split('___')[0]
      const pathsToHide = ['availability-search-results']
      const isHiddenPath = pathsToHide.find(path => path === pathOnly)
      if (isHiddenPath) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.lang-icon {
  width: 24px;
  height: 12px;
  margin-right: 8px;
}
</style>
