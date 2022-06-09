<template>
  <footer class="footer">
    <div class="columns footer-text">
      <p
        class="column is-three-fifths-desktop is-two-fifths-tablet footer-link"
      >
        {{ $t('company-name') }}
      </p>
      <br />
      <!--<div class="column footer-link">
        <a
          href="mailto:who@bam.com.mx"
          rel="noopener noreferrer"
          >{{ $t('footer-contact') }}</a
        >
        <nuxt-link :to="localePath('---')">{{
          $t('footer-terms')
        }}</nuxt-link>
        <nuxt-link :to="localePath('---')">{{
          $t('footer-privacy')
        }}</nuxt-link>
      </div>-->
    </div>
  </footer>
</template>

<script>
import { colorFooterLogo } from '~/assets/styles/_colors.scss'

export default {
  data() {
    return { colorFooterLogo }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';

.footer {
  padding: 20px 64px 25px 115px;
  background-color: $color-footer-slim-bg;

  .footer-text {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.4;
    letter-spacing: 0.01em;
    color: $color-footer-slim-text;
  }

  .footer-link {
    display: flex;
    justify-content: space-between;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 1.1rem;
    line-height: 1.45;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .lang-condition {
    display: none;
  }
}

@media (max-width: $mobile-size) {
  .footer {
    margin-left: 0;
    padding: 50px;
    background-color: $color-footer-slim-bg;
    color: $color-footer-slim-text;

    .footer-link {
      display: block;

      & a {
        display: block;
      }
    }

    .lang-condition {
      display: block;
    }
  }
}
</style>
