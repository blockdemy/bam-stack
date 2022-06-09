<!-- Layout for unauthenticated users or the general public -->

<template>
  <section class="section is-gapless is-paddingless">
    <div class="layout-container is-paddingless is-gapless">
      <HeaderPublic />
      <div class="hero is-primary column is-gapless is-paddingless">
        <div class="hero-body"></div>
      </div>
      <div class="container-outer">
        <div class="container-inner is-three-quarters column is-paddingless">
          <nuxt />
        </div>
      </div>
      <FooterPublic />
    </div>
  </section>
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

<style lang="scss" scoped>
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';

$header-height: 336px;
$content-negative-margin: $header-height * -1;
$content-top-margin: 144px;
$content-bottom-margin: 96px;

.layout-container {
  width: 100%;
  background-color: $color-background-public;
  .hero {
    .hero-body {
      height: $header-height;
      padding: 168px;
      width: 100%;
      background-image: url('../assets/images/background-img.jpg');
      background-size: $public-background-size;
      background-repeat: no-repeat;
    }
  }

  .container-outer {
    display: flex;
    justify-content: center;
    margin-top: $content-negative-margin;
    margin-bottom: $content-bottom-margin;

    .container-inner {
      margin-top: $content-top-margin;
    }
  }
}

@media (max-width: $desktop-size) {
  .layout-container {
    .container-outer {
      .container-inner {
        width: 90%;
      }
    }
  }
}

@media (max-width: $mobile-size) {
  .layout-container {
    .hero {
      .hero-body {
        height: 100px;
        background-size: 1125px;
        padding: 0;
      }
    }
    .container-outer {
      margin: $content-negative-margin 10px 7px;
      .container-inner {
        margin-top: $header-height - 50px;
      }
    }
  }
}

@media (min-width: $public-background-size) {
  .layout-container {
    .hero {
      .hero-body {
        background-size: cover;
      }
    }
  }
}
</style>
