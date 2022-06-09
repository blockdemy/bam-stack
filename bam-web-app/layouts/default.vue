<!-- Layout for public landing page -->

<template>
  <div>
    <HeaderPublic />
    <nuxt />
    <FooterPublic />
  </div>
</template>

<script>
// import { HeaderPublic, FooterPublic } from '~/components/public/landingPage'
import FooterPublic from '~/components/public/landingPage/Footer/FooterPublic'
import HeaderPublic from '~/components/public/landingPage/Header/HeaderPublic'

export default {
  components: {
    HeaderPublic,
    FooterPublic
  }
}
</script>
